import { getAuctions } from '@flow-bids/chain-interactions';
import useSWR from 'swr';
import { Auction } from '@flow-bids/models';
import { useEffect } from 'react';
import * as fcl from '@onflow/fcl';
import { Event } from '@onflow/typedefs';

const KEY = () => `auctions`;

export function useAuctions() {
  const swr = useSWR<Auction[]>(KEY(), getAuctions);

  useEffect(() => {
    fcl.events('FlowAuction.AuctionCreated').subscribe((event: Event) => {
      console.log('HEY');
      swr.mutate((auctions) => {
        return auctions
          ? auctions.concat(event.data.auction)
          : [event.data.auction];
      });
    });
  }, [swr]);

  return swr;
}
