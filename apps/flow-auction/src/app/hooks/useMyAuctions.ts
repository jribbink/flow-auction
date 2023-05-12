import { Auction } from '@flow-bids/models';
import { useAuctions } from './useAuctions';
import { useCurrentUser } from './useCurrentUser';

export function useMyAuctions(): { data: Auction[] } {
  // lol...
  const allAuctions = useAuctions();
  const user = useCurrentUser();

  return {
    data:
      allAuctions.data?.filter((auction) => auction.seller === user?.addr) ??
      [],
  };
}
