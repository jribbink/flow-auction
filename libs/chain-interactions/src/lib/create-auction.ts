import * as fcl from '@onflow/fcl';
import createAuctionCadence from '../../cadence/transactions/create-auction.cdc';

export async function createAuction() {
  return fcl.mutate({
    cadence: createAuctionCadence,
  });
}
