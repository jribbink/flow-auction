import FlowToken from 0x0ae53cb6e3f42a79
import LinkedAccounts from "./LinkedAccounts.cdc"

pub contract FlowAuction {
  pub event AuctionCreated(auction: Auction)

  pub struct Auction {
    pub let seller: Address
    pub let id: Int
    pub let bids: [Bid]

    init(id: Int, seller: Address) {
      self.seller = seller
      self.id = id
      self.bids = []
    }

    pub fun createBid(auctionId: Int, bidder: Address, amount: UFix64) {
      // Create bid
      let bid = Bid(id: self.bids.length, auctionId: auctionId, bidder: bidder, amount: amount)

      // Make sure bid is higher than previous bid
      if bid.amount <= self.bids[self.bids.length - 1].amount {
        panic("Bid must be higher than previous bid")
      }

      self.bids.append(bid)
    }

    pub fun getHighestBid(): Bid {
      return self.bids[self.bids.length - 1]
    }
  }

  pub struct Bid {
    pub let id: Int
    pub let auctionId: Int
    pub let bidder: Address
    pub let amount: UFix64

    init(id: Int, auctionId: Int, bidder: Address, amount: UFix64) {
      self.id = id
      self.auctionId = auctionId
      self.bidder = bidder
      self.amount = amount
    }
  }

  pub let auctions: [Auction]
  access(self) let balances: {Address: UFix64}
  access(self) var vault: @FlowToken.Vault

  init() {
    self.auctions = []
    self.balances = {}
    self.vault <- (FlowToken.createEmptyVault() as! @FlowToken.Vault)
  }

  // I know.  Anti-pattern.  But it's a hackathon.
  pub fun createAuction (seller: AuthAccount): Auction {
    // Create auction
    var id: Int = self.auctions.length
    let auction = Auction(id: id, seller: seller.address)

    // Add auction to list
    self.auctions.append(auction)

    // Emit event
    emit AuctionCreated(auction: auction)

    return auction
  }

  // I know.  Anti-pattern.  But it's a hackathon.
  pub fun bid (bidder: AuthAccount, auctionId: Int, amount: UFix64) {
    let auction = self.auctions[auctionId]

    // Make sure auction exists
    if auction == nil {
      panic("Auction does not exist")
    }

    // Make sure bidder is not the seller
    if bidder.address == auction.seller {
      panic("Seller cannot bid on their own auction")
    }

    // Make sure bidder has enough funds
    let vaultRef: &FlowToken.Vault = bidder.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!
    let balance: UFix64 = vaultRef.balance

    // Add bid to auction
    auction.createBid(auctionId: auctionId, bidder: bidder.address, amount: amount)

    // Transfer funds from bidder to vault
    self.vault.deposit(from: <-vaultRef.withdraw(amount: amount))
  }
}
 