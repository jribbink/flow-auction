import { getAuction } from '@flow-bids/chain-interactions';
import { Auction } from '@flow-bids/models';
import useSWR from 'swr';

const KEY = (auctionId: number | undefined) => `auctions/${auctionId}`;

export function useAuction(auctionId: number | undefined) {
  return useSWR<Auction | null>(KEY(auctionId), () =>
    auctionId != null ? getAuction(auctionId) : null
  );
}
