import * as fcl from '@onflow/fcl';
import getBidsCadence from '../../cadence/scripts/get-bids.cdc';

export async function getBids(auctionId: number) {
  return fcl.query({
    cadence: getBidsCadence,
    args: (arg, t: any) => [arg(auctionId, t.Int)],
  });
}
