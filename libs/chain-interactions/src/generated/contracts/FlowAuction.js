/** pragma type contract **/

import {
  getEnvironment,
  replaceImportAddresses,
  reportMissingImports,
  deployContract,
} from '@onflow/flow-cadut'

export const CODE = `
import FlowToken from "./FlowToken.cdc"
import LinkedAccounts from "./LinkedAccounts.cdc"

pub contract FlowAuction {
  pub struct Auction {
    pub let id: Int
    pub let bids: [Bid]

    init(id: Int, bids: [Bid]) {
      self.id = id
      self.bids = bids
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
  pub var seller: Address
  access(self) var vault: @FlowToken.Vault

  init(seller: AuthAccount) {
    self.auctions = []
    self.balances = {}
    self.seller = seller.address
    self.vault <- create FlowToken.Vault(balance: 0.0)

    // Make child account
    let childAccount = AuthAccount(payer: self)
  }

  pub fun createAuction (acct: AuthAccount, bids: [Bid]) {
    // Make sure only the seller can create an auction
    if acct.address != self.seller {
      panic("Only the seller can create an auction")
    }

    // Create auction
    var id: Int = self.auctions.length
    let auction = Auction(id: id, bids: bids)

    // Add auction to list
    self.auctions.append(auction)
  }

  pub fun bid (bidder: AuthAccount, auctionId: Int, amount: UFix64) {
    let auction = self.auctions[auctionId]

    // Make sure auction exists
    if auction == nil {
      panic("Auction does not exist")
    }

    // Make sure bidder is not the seller
    if bidder.address == self.seller {
      panic("Seller cannot bid on their own auction")
    }

    // Make sure bidder has enough funds
    let balance = getAccount(bidder.address).getCapability(/public/flowTokenBalance).borrow<&FlowToken.Vault>()!.balance

    // Add bid to auction
    auction.createBid(auctionId: auctionId, bidder: bidder.address, amount: amount)

    // Transfer funds from bidder to vault
    let vaultRef = getAccount(self.seller).getCapability(/public/flowTokenBalance).borrow<&FlowToken.Vault>()!
    vaultRef.withdraw(amount: amount)
  }


}
`;

/**
* Method to generate cadence code for FlowAuction contract
* @param {Object.<string, string>} addressMap - contract name as a key and address where it's deployed as value
*/
export const FlowAuctionTemplate = async (addressMap = {}) => {
  const envMap = await getEnvironment();
  const fullMap = {
  ...envMap,
  ...addressMap,
  };

  // If there are any missing imports in fullMap it will be reported via console
  reportMissingImports(CODE, fullMap, `FlowAuction =>`)

  return replaceImportAddresses(CODE, fullMap);
};


/**
* Deploys FlowAuction transaction to the network
* @param {Object.<string, string>} addressMap - contract name as a key and address where it's deployed as value
* @param Array<*> args - list of arguments
* param Array<string> - list of signers
*/
export const  deployFlowAuction = async (props) => {
  const { addressMap = {} } = props;
  const code = await FlowAuctionTemplate(addressMap);
  const name = "FlowAuction"

  return deployContract({ code, name, processed: true, ...props })
}