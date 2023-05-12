import * as fcl from '@onflow/fcl';
import getAuctionCadence from '../../cadence/scripts/get-auction.cdc';

export async function getAuction(auctionId: number) {
  return fcl.query({
    cadence: getAuctionCadence,
    args: (arg, t: any) => [arg(auctionId, t.Int)],
  });
}
