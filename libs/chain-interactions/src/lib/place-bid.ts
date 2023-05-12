import * as fcl from '@onflow/fcl';
import createAuctionCadence from '../../cadence/transactions/place-bid.cdc';

export async function placeBid(auctionId: number, cb: (bidId: number) => void) {
  const txid = fcl.mutate({
    cadence: createAuctionCadence,
    args: (arg, t: any) => [arg(auctionId, t.Int)],
  });

  fcl
    .tx(txid)
    .onceSealed()
    .then((txStatus: any) => {
      cb(txStatus.events[0].data.bidId);
    });

  return txid;
}
