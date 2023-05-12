import { Auction, Bid } from '@flow-bids/models';

export function parseAuction(auction: any) {
  const newAuction = <Auction>{
    ...auction,
    bidPrice: Number(auction.bidPrice),
    startPrice: Number(auction.startPrice),
    endTimestamp: Number(auction.endTimestamp),
    bids: auction.bids.map(parseBid),
    id: Number(auction.id),
  };
  console.log(newAuction);
  return newAuction;
}

export function parseBid(bid: any) {
  return <Bid>{
    ...bid,
    amount: Number(bid.amount),
    auctionId: Number(bid.auctionId),
    id: Number(bid.id),
  };
}
