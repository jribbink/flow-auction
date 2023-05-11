import * as fcl from '@onflow/fcl';
import getAuctionsCadence from '../../cadence/scripts/get-auctions.cdc';

export async function getAuctions() {
  return fcl.query({
    cadence: getAuctionsCadence,
  });
}
