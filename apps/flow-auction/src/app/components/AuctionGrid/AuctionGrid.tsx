import { Box, Grid } from '@chakra-ui/layout';
import { useState } from 'react';
import { Auction } from '../../models/auction';
import AuctionCard from '../AuctionCard/AuctionCard';

export default function AuctionGrid() {
  const [auctions, setAuctions] = useState<Auction[]>([
    {
      id: 1,
      name: 'Auction 1',
      description: 'Auction 1 description',
      image: 'https://via.placeholder.com/150',
      price: 100,
      owner: '0x01',
      highestBidder: '0x01',
      highestBid: 100,
      endTime: 100,
      isSold: false,
      bids: [],
    },
    {
      id: 2,
      name: 'Auction 2',
      description: 'Auction 2 description',
      image: 'https://via.placeholder.com/150',
      price: 100,
      owner: '0x01',
      highestBidder: '0x01',
      highestBid: 100,
      endTime: 100,
      isSold: false,
      bids: [],
    },
    {
      id: 3,
      name: 'Auction 3',
      description: 'Auction 3 description',
      image: 'https://via.placeholder.com/150',
      price: 100,
      owner: '0x01',
      highestBidder: '0x01',
      highestBid: 100,
      endTime: 100,
      isSold: false,
      bids: [],
    },
    {
      id: 4,
      name: 'Auction 4',
      description: 'Auction 4 description',
      image: 'https://via.placeholder.com/150',
      price: 100,
      owner: '0x01',
      highestBidder: '0x01',
      highestBid: 100,
      endTime: 100,
      isSold: false,
      bids: [],
    },
  ]);

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </Grid>
  );
}
