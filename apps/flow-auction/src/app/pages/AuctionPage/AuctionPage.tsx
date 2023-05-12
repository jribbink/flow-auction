import { Box, Container, Grid, Heading, Text } from '@chakra-ui/layout';
import { useParams } from 'react-router';
import { Image } from '@chakra-ui/image';
import { Auction } from '@flow-bids/models';
import BiddingCard from '../../components/BiddingCard/BiddingCard';
import { Icon } from '@chakra-ui/icon';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useAuction } from '../../hooks/useAuction';
import { Spinner } from '@chakra-ui/react';

export default function AuctionPage() {
  const params = useParams<{ auctionId: string }>();
  const { data: auction } = useAuction(
    params.auctionId ? parseInt(params.auctionId) : undefined
  );

  return (
    <Container
      maxW="container.lg"
      bgColor="white"
      rounded="xl"
      shadow="md"
      p="8"
      display="flex"
      flexDirection="column"
    >
      {auction ? (
        <Grid templateColumns="repeat(2, 1fr)">
          <Box>
            <Heading fontWeight="normal">{auction?.title}</Heading>
            <Image src={auction?.image}></Image>
          </Box>
          <BiddingCard bids={auction.bids}></BiddingCard>
        </Grid>
      ) : (
        <Spinner
          m="8"
          my="14"
          alignSelf="center"
          mx="auto"
          size="xl"
          thickness="4px"
        ></Spinner>
      )}
    </Container>
  );
}
