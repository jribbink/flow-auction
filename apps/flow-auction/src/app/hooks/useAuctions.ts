import { getAuctions } from '@init/chain-interactions';
import useSWR from 'swr';
import { Auction } from '../models/auction';
import { useEffect } from 'react';
import * as fcl from '@onflow/fcl';
import { Event } from '@onflow/typedefs';

export function useAuctions() {
  const swr = useSWR<Auction[]>('auctions', getAuctions);

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
