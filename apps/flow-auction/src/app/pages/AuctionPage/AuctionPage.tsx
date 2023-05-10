import { Box, Container, Grid, Heading, Text } from '@chakra-ui/layout';
import { useParams } from 'react-router';
import { Image } from '@chakra-ui/image';
import { Auction } from '../../models/auction';
import BiddingCard from '../../components/BiddingCard/BiddingCard';
import { Icon } from '@chakra-ui/icon';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function AuctionPage() {
  const params = useParams<{ auctionId: string }>();
  const auction: Auction = {
    id: 1,
    name: 'Auction 1',
    description: 'Auction 1 description',
    image: 'https://via.placeholder.com/400',
    bids: [
      {
        id: 1,
        amount: 100,
        bidder: '0x01',
        auctionId: 1,
      },
      {
        id: 2,
        amount: 200,
        bidder: '0x02',
        auctionId: 1,
      },
      {
        id: 3,
        amount: 300,
        bidder: '0x03',
        auctionId: 1,
      },
    ],
  } as Auction;

  return (
    <Container
      maxW="container.lg"
      bgColor="white"
      rounded="xl"
      shadow="lg"
      p="4"
    >
      <Grid templateColumns="repeat(2, 1fr)">
        <Box>
          <Heading fontWeight="normal">{auction.name}</Heading>
          <Image src={auction.image}></Image>
        </Box>
        <BiddingCard bids={auction.bids}></BiddingCard>
      </Grid>
    </Container>
  );
}
