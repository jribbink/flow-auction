import { Button } from '@chakra-ui/button';
import { useLoggedIn } from '../../hooks/useLoggedIn';
import * as fcl from '@onflow/fcl';
import { Box } from '@chakra-ui/layout';

export default function WalletView() {
  const loggedIn = useLoggedIn();

  if (loggedIn) {
    return <Box>Hello world</Box>;
  }

  return (
    <Button colorScheme="blue" onClick={() => fcl.authenticate()}>
      Connect Wallet
    </Button>
  );
}
