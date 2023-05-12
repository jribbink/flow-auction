import * as fcl from '@onflow/fcl';
import getAuctionCadence from '../../cadence/scripts/get-auction.cdc';
import { parseAuction } from '../util';

export async function getAuction(auctionId: number) {
  const auction = await fcl.query({
    cadence: getAuctionCadence,
    args: (arg, t: any) => [arg(auctionId, t.Int)],
  });

  return parseAuction(auction);
}
