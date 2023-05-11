import FlowAuction from "../contracts/FlowAuction.cdc"

transaction {
    prepare(acct: AuthAccount) {
        FlowAuction.createAuction(seller: acct)
    }
}