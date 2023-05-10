import { Bid } from './bid';

export interface Auction {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  owner: string;
  highestBidder: string;
  highestBid: number;
  endTime: number;
  isSold: boolean;
  bids: Bid[];
}
