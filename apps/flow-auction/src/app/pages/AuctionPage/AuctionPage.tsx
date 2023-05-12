import {
  Container,
  Heading,
  SimpleGrid,
  Flex,
  Box,
  Text,
  Spacer,
} from '@chakra-ui/layout';
import { useParams } from 'react-router';
import { Image } from '@chakra-ui/image';
import BiddingCard from '../../components/BiddingCard/BiddingCard';
import { useAuction } from '../../hooks/useAuction';
import { Spinner } from '@chakra-ui/react';

export default function AuctionPage() {
  const params = useParams<{ auctionId: string }>();
  const { data: auction } = useAuction(
    params.auctionId != null ? parseInt(params.auctionId) : undefined
  );

  console.log(auction);

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
        <>
          <SimpleGrid columns={2} gap="14">
            <Flex flexDirection="column">
              <Heading fontWeight="normal">{auction?.title}</Heading>
              <Image src={auction?.image} width="100%" aspectRatio={1}></Image>
            </Flex>
            <BiddingCard bids={auction.bids} auction={auction}></BiddingCard>
          </SimpleGrid>
          <Box mt="6">
            <Heading size="md" pb="4">
              Description
            </Heading>
            <Text>{auction.description}</Text>
          </Box>
        </>
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
