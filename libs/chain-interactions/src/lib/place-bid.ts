import * as fcl from '@onflow/fcl';
import createAuctionCadence from '../../cadence/transactions/place-bid.cdc';

export function placeBid(auctionId: number, amount: number) {
  return fcl
    .tx(
      fcl.mutate({
        cadence: createAuctionCadence,
        args: (arg, t: any) => [arg(auctionId, t.Int), arg(amount, t.UFix64)],
      })
    )
    .onceSealed();
}
