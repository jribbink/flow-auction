import { Button } from '@chakra-ui/button';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import * as fcl from '@onflow/fcl';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

export default function WalletView() {
  const user = useCurrentUser();

  if (user === undefined) return null;
  if (user?.loggedIn)
    return (
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {user.addr}
        </MenuButton>
        <MenuList>
          <MenuItem
            minH="48px"
            display="flex"
            justifyContent="center"
            onClick={() => {
              fcl.unauthenticate();
            }}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    );

  return (
    <Button colorScheme="blue" onClick={() => fcl.authenticate()}>
      Connect Wallet
    </Button>
  );
}
