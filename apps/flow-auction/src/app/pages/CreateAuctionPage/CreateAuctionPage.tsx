import { Container, Heading, Flex, Box } from '@chakra-ui/layout';
import { Button, Image, Input } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { Auction } from '../../models/auction';
import { useNavigate } from 'react-router-dom';
import { createAuction } from '@init/chain-interactions';

export default function CreateAuctionPage() {
  const [auction, setAuction] = useState<Partial<Auction>>({});
  const navigate = useNavigate();

  const handleSaveAuction = useCallback(async () => {
    await createAuction().then(console.log);
    navigate('/my-auctions');
  }, [auction, navigate]);

  return (
    <Container maxW="container.sm" p="4" bgColor="white" rounded="xl">
      <Heading size="md">Create a new auction</Heading>
      <Flex mt="4" flexDirection="column">
        <Heading size="sm">Step 1: Upload an image</Heading>

        <Box
          w="300px"
          h="300px"
          display="flex"
          flexGrow={1}
          border="1px"
          alignSelf="center"
        >
          {auction.image ? (
            <Image w="100%" src={auction.image}></Image>
          ) : (
            <Box alignSelf="center" m="auto">
              Upload an image
            </Box>
          )}
        </Box>

        <Heading size="sm">Step 2: Set a starting price</Heading>

        <Input
          onChange={(e) =>
            setAuction({ ...auction, price: Number(e.target.value) })
          }
        ></Input>

        <Heading size="sm">Step 3: Set an ending price</Heading>

        <Input
          onChange={(e) =>
            setAuction({ ...auction, price: Number(e.target.value) })
          }
        ></Input>

        <Heading size="sm">Step 4: Set an ending time</Heading>

        <Input
          onChange={(e) =>
            setAuction({ ...auction, price: Number(e.target.value) })
          }
        ></Input>

        <Heading size="sm">Step 5: Set a name</Heading>

        <Input
          onChange={(e) =>
            setAuction({ ...auction, price: Number(e.target.value) })
          }
        ></Input>

        <Flex pt="4" gap="2" justifyContent="center">
          <Button colorScheme="red" onClick={() => navigate('/my-auctions')}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleSaveAuction}>
            Save Auction
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
}
