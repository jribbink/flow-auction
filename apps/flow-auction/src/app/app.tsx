import bootstrap from './config/bootstrap';
import { ChakraProvider } from '@chakra-ui/react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import Layout from './components/Layout/Layout';
import AuctionPage from './pages/AuctionPage/AuctionPage';
import MyAuctionsPage from './pages/MyAuctionsPage/MyAuctionsPage';
import { ROUTES } from './config/route-config';

bootstrap();

const router = createBrowserRouter(
  ROUTES.map((r) => ({ path: r.path, Component: r.Component }))
);

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
