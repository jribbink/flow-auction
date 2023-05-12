import { Bid } from './bid';

export interface Auction {
  id: number;
  image: string;
  title: string;
  description: string;
  bidPrice: number;
  startPrice: number;
  seller: string;
  endTimestamp: number;
  isSold: boolean;
  bids: Bid[];
}
