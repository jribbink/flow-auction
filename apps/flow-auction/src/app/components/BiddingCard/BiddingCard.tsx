import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/layout';
import { Bid } from '@flow-bids/models';
import { useLoggedIn } from '../../hooks/useLoggedIn';
import { Button } from '@chakra-ui/button';
import * as fcl from '@onflow/fcl';

export default function BiddingCard({ bids }: { bids: Bid[] }) {
  const loggedIn = useLoggedIn();

  return (
    <Flex rounded="lg" background="#333333" flexDir="column" p="4">
      <Heading textColor="white" textAlign="center">
        Current Bids
      </Heading>
      {bids.map((bid: Bid) => (
        <Box key={bid.id} p="2" background="white" rounded="xl">
          <Text>{bid.amount}</Text>
          <Text>{bid.bidder}</Text>
        </Box>
      ))}

      <Spacer></Spacer>

      {loggedIn === undefined ? null : loggedIn ? (
        <Box p="2" background="white" rounded="xl">
          <Text>Place a bid</Text>
        </Box>
      ) : (
        <Button
          colorScheme="blue"
          size="lg"
          justifySelf="center"
          onClick={() => fcl.authenticate()}
        >
          Connect Wallet to Place A Bid
        </Button>
      )}
    </Flex>
  );
}
