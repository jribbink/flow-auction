import { Container, Heading, SimpleGrid, Spacer } from '@chakra-ui/react';
import { useAuctions } from '../../hooks/useAuctions';
import AuctionGridCard from '../../components/AuctionGridCard/AuctionGridCard';

export default function HomePage() {
  const { data: auctions } = useAuctions();

  return (
    <Container maxW="container.lg" p="8" rounded="lg" bg="white" shadow="md">
      <Heading size="lg">Explore Auctions</Heading>
      <Spacer h="25px"></Spacer>
      <SimpleGrid columns={4} gap={6}>
        {(auctions || []).map((auction) => (
          <AuctionGridCard key={auction.id} auction={auction} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
