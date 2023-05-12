import FlowToken from 0x0ae53cb6e3f42a79
import FungibleToken from 0xee82856bf20e2aa6
import LinkedAccounts from "./LinkedAccounts.cdc"

pub contract FlowAuction {
  pub event AuctionCreated(auction: Auction)
  pub event BidCreated(auctionId: Int, bid: Bid)

  pub struct Auction {
    pub let id: Int
    pub let image: String
    pub let title: String
    pub let description: String
    pub let bidPrice: UFix64
    pub let startPrice: UFix64
    pub let seller: Address
    pub let bids: [Bid]
    pub let endTimestamp: UFix64

    init(id: Int, image: String, title: String, description: String, bidPrice: UFix64, startPrice: UFix64, seller: Address, endTimestamp: UFix64) {
      self.id = id
      self.image = image
      self.title = title
      self.description = description
      self.bidPrice = bidPrice
      self.startPrice = startPrice
      self.seller = seller
      self.endTimestamp = endTimestamp
      self.bids = []
    }

    pub fun createBid(auctionId: Int, bidder: Address, amount: UFix64) {
      // Create bid
      let bid = Bid(id: self.bids.length, auctionId: auctionId, bidder: bidder, amount: amount)
      self.bids.append(bid)

      // Emit event
      emit BidCreated(auctionId: auctionId, bid: bid)
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
  pub fun createAuction (
    seller: AuthAccount,
    image: String,
    title: String,
    description: String,
    bidPrice: UFix64,
    startPrice: UFix64,
    endTimestamp: UFix64
  ): Auction {
    // Create auction
    var id: Int = self.auctions.length
    let auction = Auction(
      id: id,
      image: image,
      title: title,
      description: description,
      bidPrice: bidPrice,
      startPrice: bidPrice,
      seller: seller.address,
      endTimestamp: endTimestamp
    )

    // Add auction to list
    self.auctions.append(auction)

    // Emit event
    emit AuctionCreated(auction: auction)

    return auction
  }

  // I know.  Anti-pattern.  But it's a hackathon.
  pub fun bid (bidder: AuthAccount, auctionId: Int) {
    pre {
      self.auctions[auctionId].endTimestamp > getCurrentBlock().timestamp : "Auction has ended"
      self.auctions[auctionId] != nil : "Auction does not exist"
      bidder.address != self.auctions[auctionId].seller : "Seller cannot bid on their own auction"
    }

    // Make sure bidder has enough funds
    let vaultRef: &FlowToken.Vault = bidder.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!
    let balance: UFix64 = vaultRef.balance

    var amount = self.auctions[auctionId].bidPrice

    if self.auctions[auctionId].bids.length > 0 {
      amount = self.auctions[auctionId].getHighestBid().amount + self.auctions[auctionId].bidPrice

      // Return back to previous highest bidder
      let receiverRef = getAccount(self.auctions[auctionId].getHighestBid().bidder)
          .getCapability(/public/flowTokenReceiver)
          .borrow<&{FungibleToken.Receiver}>()
    ?? panic("Could not borrow receiver reference to the recipient's Vault")

      // Deposit the withdrawn tokens in the recipient's receiver
      receiverRef.deposit(from: <- self.vault.withdraw(amount: self.auctions[auctionId].getHighestBid().amount))

      amount = amount + 0.01
    } else {
      amount = self.auctions[auctionId].startPrice
    }

    // Add bid to auction
    self.auctions[auctionId].createBid(auctionId: auctionId, bidder: bidder.address, amount: amount)

    // Transfer funds from bidder to vault
    self.vault.deposit(from: <-vaultRef.withdraw(amount: amount + self.auctions[auctionId].bidPrice))
  }
}
 