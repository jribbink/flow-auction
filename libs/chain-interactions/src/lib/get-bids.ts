import * as fcl from '@onflow/fcl';
import getBidsCadence from '../../cadence/scripts/get-bids.cdc';
import { parseBid } from '../util';

export async function getBids(auctionId: number) {
  const resp = await fcl.query({
    cadence: getBidsCadence,
    args: (arg, t: any) => [arg(auctionId, t.Int)],
  });

  console.log(resp.map((x: any) => parseBid(x)));

  return resp.map((x: any) => parseBid(x));
}
