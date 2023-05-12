import { Button } from '@chakra-ui/button';
import { Container, Flex, Text, Heading } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import AuctionGridCard from '../../components/AuctionGridCard/AuctionGridCard';
import { useMyAuctions } from '../../hooks/useMyAuctions';
import { Auction } from '@flow-bids/models';

export default function MyAuctionsPage() {
  const auctions = useMyAuctions();

  return (
    <Container
      maxW="container.sm"
      p="8"
      rounded="lg"
      bg="white"
      shadow="md"
      minH="350px"
      display="flex"
      flexDirection="column"
    >
      <Flex alignItems="start">
        <Heading size="md">My Auctions</Heading>
        <Button as={Link} ml="auto" to="/auctions/create" colorScheme="green">
          New Auction
        </Button>
      </Flex>
      <Flex mt="4" flexDir="column" flexGrow={1}>
        {auctions.length === 0 ? (
          <Flex justifyContent="center" my="auto">
            <Text>
              You have no auctions yet,{' '}
              <Link to="/auctions/create" style={{ color: 'blue' }}>
                create one to get started.
              </Link>
            </Text>
          </Flex>
        ) : (
          auctions.map((auction: Auction) => (
            <AuctionGridCard
              key={auction.id}
              auction={auction}
            ></AuctionGridCard>
          ))
        )}
      </Flex>
    </Container>
  );
}
