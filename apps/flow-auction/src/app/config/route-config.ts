import { ComponentType } from 'react';
import HomePage from '../pages/HomePage/HomePage';
import MyAuctionsPage from '../pages/MyAuctionsPage/MyAuctionsPage';
import BidsPage from '../pages/BidsPage/BidsPage';
import CreateAuctionPage from '../pages/CreateAuctionPage/CreateAuctionPage';
import AuctionPage from '../pages/AuctionPage/AuctionPage';

export interface RouteConfig {
  label?: string;
  subLabel?: string;
  path: string;
  Component: ComponentType<object> | null | undefined;
  inMenu?: boolean;
}

export const ROUTES: Array<RouteConfig> = [
  {
    label: 'All Auctions',
    path: '/',
    Component: HomePage,
  },
  {
    label: 'My Auctions',
    path: '/my-auctions',
    Component: MyAuctionsPage,
  },
  {
    label: 'My Bids',
    path: '/my-bids',
    Component: BidsPage,
  },
  {
    path: '/auctions/create',
    Component: CreateAuctionPage,
    inMenu: false,
  },
  {
    path: '/auctions/:id',
    Component: AuctionPage,
    inMenu: false,
  },
];
