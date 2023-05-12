import { Bid } from './bid';

export interface Auction {
  id: number;
  image: string;
  title: string;
  description: string;
  bidPrice: number;
  seller: string;
  endTime: number;
  isSold: boolean;
  bids: Bid[];
}
