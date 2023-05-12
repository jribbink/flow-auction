import { Box, Text } from '@chakra-ui/layout';
import { Auction } from '@flow-bids/models';
import { Image } from '@chakra-ui/image';
import { NavLink } from 'react-router-dom';
import { Card } from '@chakra-ui/card';
import { useExpiryString } from '../../hooks/useExpiryString';

export default function AuctionGridCard({ auction }: { auction: Auction }) {
  const remainingString = useExpiryString(auction.endTimestamp);

  return (
    <Card rounded="md" size="lg">
      <NavLink to={`/auctions/${auction.id}`}>
        <Image
          aspectRatio={1}
          roundedTop="md"
          src={auction.image}
          p="2"
        ></Image>
        <Box backgroundColor="lightgrey" roundedBottom="lg" p="2">
          <Text fontWeight="bold">{auction.title}</Text>
          <Text>
            Price:{' '}
            {auction.bids.length === 0
              ? auction.startPrice
              : auction.bids.at(-1)!.amount + 0.01}{' '}
            FLOW
          </Text>
          <Text color="red">
            {remainingString !== null
              ? `Expires in ${remainingString}`
              : `Expired`}
          </Text>
        </Box>
      </NavLink>
    </Card>
  );
}
