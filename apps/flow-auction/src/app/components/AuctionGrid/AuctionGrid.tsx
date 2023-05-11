import { Grid } from '@chakra-ui/layout';
import AuctionCard from '../AuctionCard/AuctionCard';
import { useAuctions } from '../../hooks/useAuctions';

export default function AuctionGrid() {
  const { data: auctions } = useAuctions();

  console.log(auctions);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {(auctions || []).map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </Grid>
  );
}
