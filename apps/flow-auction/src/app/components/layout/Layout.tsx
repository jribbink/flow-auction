import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronRightIcon } from '@chakra-ui/icons';
import WalletView from '../WalletView/WalletView';
import { ROUTES, RouteConfig } from '../../config/route-config';

export default function WithSubnavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      h="100vh"
      flexDir="column"
      overflow="hidden"
      backgroundColor="#EEEEEE"
    >
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        shadow="md"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Button
            variant="unstyled"
            onClick={() => (window.location.href = '/')}
          >
            <Text
              textAlign={'left'}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              fontSize="xl"
              fontWeight="bold"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              Flow Bid
            </Text>
          </Button>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <WalletView></WalletView>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>

      <Box paddingY="4" flex={1} overflow="auto">
        {children}
      </Box>
    </Flex>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction={'row'} spacing={4}>
      {ROUTES.map((navItem) => (
        <Box
          key={navItem.label}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.path}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, path, subLabel }: RouteConfig) => {
  return (
    <Link
      href={path}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {ROUTES.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, path }: RouteConfig) => {
  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as={Link}
        href={path}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};
