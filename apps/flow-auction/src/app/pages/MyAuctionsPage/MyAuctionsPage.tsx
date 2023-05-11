import { Button } from '@chakra-ui/button';
import { Container, Flex, Text } from '@chakra-ui/layout';
import { Link, NavLink } from 'react-router-dom';
import AuctionCard from '../../components/AuctionCard/AuctionCard';
import { useMyAuctions } from '../../hooks/useMyAuctions';
import { Auction } from '../../models/auction';

export default function MyAuctionsPage() {
  const auctions = useMyAuctions();

  return (
    <Container maxW="container.sm" p="4" rounded="lg" bg="white">
      <Flex alignItems="center">
        <Text>My Auctions</Text>
        <Button as={Link} ml="auto" to="/auctions/create" colorScheme="green">
          New Auction
        </Button>
      </Flex>
      <Flex mt="4" flexDir="column">
        {auctions.length === 0 ? (
          <Flex p="6" justifyContent="center">
            <Text>
              You have no auctions yet,{' '}
              <Link to="/auctions/create" style={{ color: 'blue' }}>
                create one to get started.
              </Link>
            </Text>
          </Flex>
        ) : (
          auctions.map((auction: Auction) => (
            <AuctionCard key={auction.id} auction={auction}></AuctionCard>
          ))
        )}
      </Flex>
    </Container>
  );
}
