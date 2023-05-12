import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/layout';
import { Auction, Bid } from '@flow-bids/models';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { Button } from '@chakra-ui/button';
import * as fcl from '@onflow/fcl';
import { placeBid } from '@flow-bids/chain-interactions';
import { useMemo } from 'react';
import { useExpiryString } from '../../hooks/useExpiryString';

export default function BiddingCard({
  bids,
  auction,
}: {
  bids: Bid[];
  auction: Auction;
}) {
  const user = useCurrentUser();
  const expiry = useExpiryString(auction.endTimestamp);

  const handlePlaceBid = async () => {
    await placeBid(auction.id, (bidId) => {
      console.log('bid placed with id', bidId);
    });
  };

  const bidPrice = useMemo<number | undefined>(() => {
    return bids.length > 0 ? bids.at(-1)!.amount + 0.01 : auction?.startPrice;
  }, [bids, auction]);

  const highestBid = useMemo<number | undefined>(
    () => auction.bids.at(-1)?.amount,
    [auction]
  );

  return (
    <Flex rounded="lg" background="#333333" flexDir="column" p="4">
      <Heading fontSize="2xl" textColor="white" textAlign="center" mb="4">
        {highestBid != null
          ? `Highest Bid - ${highestBid.toFixed(8)} FLOW`
          : 'No Bids Yet'}
      </Heading>

      <Box
        overflow="auto"
        h="320px"
        display="flex"
        flexDirection="column"
        gap="2"
      >
        {[...bids].reverse().map((bid: Bid) => (
          <Box
            key={bid.id}
            p="2"
            display="flex"
            flexDirection="row"
            rounded="lg"
            backgroundColor="white"
          >
            <Text fontWeight="bold" textColor="black">
              {bid.bidder}
            </Text>
            <Spacer></Spacer>
            <Text fontWeight="bold" textColor="black">
              {bid.amount.toFixed(8)} FLOW
            </Text>
          </Box>
        ))}
      </Box>

      <Spacer></Spacer>

      <Text
        textAlign="center"
        alignSelf="center"
        fontSize="2xl"
        color="red"
        fontWeight="bold"
      >
        {expiry !== null ? `Auction expires in ${expiry}` : 'Auction expired'}
      </Text>

      {user?.loggedIn ? (
        <>
          <Button
            mt="2"
            colorScheme="blue"
            size="lg"
            justifySelf="center"
            onClick={handlePlaceBid}
          >
            Place a bid of {bidPrice?.toFixed(2)} FLOW*
          </Button>
          <Text size="sm" mt="2" textColor="white">
            * This auction has an additional {auction.bidPrice.toFixed(2)} FLOW
            bidding fee
          </Text>
        </>
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
