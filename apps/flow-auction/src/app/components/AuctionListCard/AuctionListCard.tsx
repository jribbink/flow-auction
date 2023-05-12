import {
  Box,
  Button,
  Flex,
  Image,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { Auction } from '@flow-bids/models';
import { useExpiryString } from '../../hooks/useExpiryString';
import { useNavigate } from 'react-router-dom';

export default function AuctionListCard({ auction }: { auction: Auction }) {
  const expiry = useExpiryString(auction.endTimestamp);
  const navigate = useNavigate();

  return (
    <Flex shadow="lg" rounded="lg" p="3" px="8">
      <Box display="flex" flexDirection="row" mr="14">
        <Image src={auction.image} height="150px" aspectRatio={1}></Image>
      </Box>
      <Flex
        flexDirection="column"
        alignContent="center"
        justifyContent="center"
      >
        <Text fontWeight="bold" fontSize="xl">
          {auction.title}
        </Text>
        <Text>
          Total bids -{' '}
          <Text as="span" fontWeight="semibold">
            {auction.bids.length} bids placed
          </Text>
        </Text>
        <Text>
          Current price -{' '}
          <Text as="span" fontWeight="semibold">
            {(auction.bids.length === 0
              ? auction.startPrice
              : auction.bids.at(-1)!.amount + 0.01
            )?.toFixed(8)}{' '}
            FLOW
          </Text>
        </Text>
        <Text>
          Total fees -{' '}
          <Text as="span" fontWeight="semibold">
            {(auction.bids.length * auction.bidPrice).toFixed(8)} FLOW
          </Text>
        </Text>

        {auction.bids.length > 0 && (
          <Text>
            Top bidder -{' '}
            <Text as="span" fontWeight="semibold">
              {auction.bids.at(-1)?.bidder}
            </Text>
          </Text>
        )}

        <Text color="red" fontWeight="semibold">
          {expiry !== null ? `Expires in ${expiry}` : `Auction is complete`}
        </Text>
      </Flex>
    </Flex>
  );
}
