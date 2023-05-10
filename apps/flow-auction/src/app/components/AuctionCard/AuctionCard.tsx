import { Box, Text } from '@chakra-ui/layout';
import { Auction } from '../../models/auction';
import { Image } from '@chakra-ui/image';
import { NavLink } from 'react-router-dom';
import { Card } from '@chakra-ui/card';

export default function AuctionCard({ auction }: { auction: Auction }) {
  return (
    <NavLink to={`/auctions/${auction.id}`}>
      <Card>
        <Text>{auction.name}</Text>
        <Image src={auction.image}></Image>
        <Box backgroundColor="lightgrey" roundedBottom="lg">
          <Text>Price: {auction.price}</Text>
        </Box>
      </Card>
    </NavLink>
  );
}
