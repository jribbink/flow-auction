import * as fcl from '@onflow/fcl';
import createAuctionCadence from '../../cadence/transactions/create-auction.cdc';
export interface CreateAuctionParams {
  image: string;
  title: string;
  description: string;
  bidPrice: number;
  endDate: Date;
}

export async function createAuction(
  { image, title, description, bidPrice, endDate }: CreateAuctionParams,
  createdCallback?: (auctionId: number) => void
) {
  const txid = await fcl.mutate({
    cadence: createAuctionCadence,
    args: (arg, t: any) => [
      arg(image, t.String),
      arg(title, t.String),
      arg(description, t.String),
      arg(bidPrice.toFixed(2), t.UFix64),
      arg((endDate.getTime() / 1000).toFixed(8), t.UFix64),
    ],
  });

  if (createdCallback)
    fcl.tx(txid).subscribe((txStatus: any) => {
      if (fcl.tx.isSealed(txStatus)) {
        createdCallback(txStatus.events[0].data.auctionId);
      }
    });

  return txid;
}
