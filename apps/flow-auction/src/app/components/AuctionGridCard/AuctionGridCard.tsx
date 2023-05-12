import { Box, Text } from '@chakra-ui/layout';
import { Auction } from '@flow-bids/models';
import { Image } from '@chakra-ui/image';
import { NavLink } from 'react-router-dom';
import { Card } from '@chakra-ui/card';

export default function AuctionGridCard({ auction }: { auction: Auction }) {
  return (
    <NavLink to={`/auctions/${auction.id}`}>
      <Card shadow="md" rounded="md" size="lg">
        <Image aspectRatio={1} roundedTop="md" src={auction.image}></Image>
        <Box backgroundColor="lightgrey" roundedBottom="lg">
          <Text>Price: {auction.bidPrice}</Text>
        </Box>
      </Card>
    </NavLink>
  );
}
