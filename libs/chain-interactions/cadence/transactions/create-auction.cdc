import FlowAuction from "../contracts/FlowAuction.cdc"

transaction(image: String, title: String, description: String, bidPrice: UFix64, endTimestamp: UFix64) {
    prepare(acct: AuthAccount) {
        FlowAuction.createAuction(seller: acct, image: image, title: title, description: description, bidPrice: bidPrice, endTimestamp: endTimestamp)
    }
}