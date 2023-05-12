import FlowAuction from "../contracts/FlowAuction.cdc"

transaction(auctionId: Int) {
    prepare(acct: AuthAccount) {
        FlowAuction.bid(bidder: acct, auctionId: auctionId)
    }
}