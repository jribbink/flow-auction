import * as fcl from '@onflow/fcl';
import getAuctionsCadence from '../../cadence/scripts/get-auctions.cdc';
import { parseAuction } from '../util';

export async function getAuctions() {
  const resp = await fcl.query({
    cadence: getAuctionsCadence,
  });

  return resp.map((x: any) => parseAuction(x));
}
