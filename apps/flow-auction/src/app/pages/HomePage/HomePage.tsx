import { Container } from '@chakra-ui/react';
import AuctionGrid from '../../components/AuctionGrid/AuctionGrid';

export default function Home() {
  return (
    <Container maxW="container.lg" p="4" rounded="lg" bg="white">
      <AuctionGrid></AuctionGrid>
    </Container>
  );
}
