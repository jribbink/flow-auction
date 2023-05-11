import FlowAuction from "../contracts/FlowAuction.cdc"

pub fun main(auctionId: Int): FlowAuction.Auction {
    return FlowAuction.auctions[auctionId]
}