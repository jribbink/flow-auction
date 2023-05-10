import './config';
import { ChakraProvider } from '@chakra-ui/react';
import { Route, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import Layout from './components/Layout/Layout';
import AuctionPage from './pages/AuctionPage/AuctionPage';
import MyAuctionsPage from './pages/MyAuctionsPage/MyAuctionsPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/auctions/:auctionId',
    Component: AuctionPage,
  },
  {
    path: '/my-auctions',
    Component: MyAuctionsPage,
  },
]);

export function App() {
  return (
    <ChakraProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </ChakraProvider>
  );
}

export default App;
