import { Button } from '@chakra-ui/button';
import { Container, Flex, Text } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';

export default function MyAuctionsPage() {
  return (
    <Container maxW="container.sm" p="4" rounded="lg" bg="white">
      <Flex alignItems="center">
        <Text>My Auctions</Text>
        <Button as={Link} ml="auto" to="/auctions/create" colorScheme="green">
          New Auction
        </Button>
      </Flex>
    </Container>
  );
}
