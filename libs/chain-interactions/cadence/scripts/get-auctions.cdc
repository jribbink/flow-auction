import FlowAuction from "../contracts/FlowAuction.cdc"

pub fun main(): [FlowAuction.Auction] {
    return FlowAuction.auctions
}