import FlowAuction from "../contracts/FlowAuction.cdc"

pub fun main(auctionId: Int): [FlowAuction.Bid] {
    return FlowAuction.auctions[auctionId].bids
}