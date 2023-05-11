import FlowAuction from "../contracts/FlowAuction.cdc"

transaction(auctionId: Int, amount: UFix64) {
    prepare(acct: AuthAccount) {
        FlowAuction.bid(bidder: acct, auctionId: auctionId, amount: amount)
    }
}