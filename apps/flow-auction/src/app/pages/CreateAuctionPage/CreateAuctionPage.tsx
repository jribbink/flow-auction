import { Container, Heading, Flex, Box } from '@chakra-ui/layout';
import { Button, Image, Input, Text } from '@chakra-ui/react';
import React, { createRef, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreateAuctionParams,
  createAuction,
} from '@flow-bids/chain-interactions';
import axios from 'axios';

type Nullable<T> = { [K in keyof T]: T[K] | null };

export default function CreateAuctionPage() {
  const navigate = useNavigate();

  const [auction, setAuction] = useState<Nullable<CreateAuctionParams>>({
    title: null,
    description: null,
    bidPrice: 0.1,
    image: null,
    endDate: null,
  });

  const validateAuction = useCallback(
    () =>
      Object.keys(auction).every(
        (key) => auction[key as keyof CreateAuctionParams] !== null
      ),
    [auction]
  );

  const handleSaveAuction = useCallback(async () => {
    if (!validateAuction()) return;

    await createAuction(auction as CreateAuctionParams, (auctionId) => {
      console.log('auction created with id', auctionId);
    });
    navigate('/my-auctions');
  }, [auction, navigate]);

  // Create a reference to the hidden file input element
  const hiddenFileInput = createRef<HTMLInputElement>();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    const fileUploaded = event.target.files?.[0];
    if (!fileUploaded) return;

    const params = new FormData();
    params.append('file', fileUploaded);

    const {
      data: { path: filepath },
    } = await axios.post('/upload', params);

    setAuction({
      ...auction,
      image: new URL(filepath, axios.defaults.baseURL).toString(),
    });
  };

  return (
    <>
      <Container
        maxW="container.sm"
        p="8"
        bgColor="white"
        rounded="xl"
        shadow="md"
      >
        <Heading size="md">Create a new auction</Heading>
        <Flex mt="4" flexDirection="column" gap="4">
          <Heading size="sm">Step 1: Upload an image</Heading>

          <Button
            onClick={() => hiddenFileInput.current!.click()}
            variant="unstyled"
            w="300px"
            h="300px"
            display="flex"
            alignSelf="center"
            rounded="lg"
          >
            {auction.image ? (
              <Image
                w="100%"
                h="100%"
                src={auction.image}
                rounded="lg"
                border="1px"
              ></Image>
            ) : (
              <Flex
                flexDirection="column"
                border="1px"
                rounded="lg"
                height="100%"
                width="100%"
              >
                <Text alignSelf="center" m="auto">
                  Click to upload an image
                </Text>
              </Flex>
            )}
          </Button>

          <Heading size="sm">Step 2: Enter auction details</Heading>

          <Flex flexDirection="column" gap="2">
            <Text>Title</Text>
            <Input
              value={auction.title ?? ''}
              onChange={(e) =>
                setAuction({ ...auction, title: e.target.value })
              }
            ></Input>
          </Flex>

          <Flex flexDirection="column" gap="2">
            <Text>Description</Text>
            <Input
              value={auction.description ?? ''}
              onChange={(e) =>
                setAuction({ ...auction, description: e.target.value })
              }
            ></Input>
          </Flex>

          <Flex flexDirection="column" gap="2">
            <Text>Bid Price</Text>
            <Input
              value={auction.bidPrice ?? ''}
              onChange={(e) =>
                setAuction({
                  ...auction,
                  bidPrice: Number(e.target.value) ?? null,
                })
              }
            ></Input>
          </Flex>

          <Flex flexDirection="column" gap="2">
            <Text>Auction end</Text>
            <Input
              value={auction.endDate?.toISOString().slice(0, -1) ?? ''}
              type="datetime-local"
              onChange={(e) => {
                try {
                  const endDate = new Date(e.target.value);
                  endDate.setTime(
                    endDate.getTime() - endDate.getTimezoneOffset() * 60 * 1000
                  );
                  setAuction({ ...auction, endDate });
                  // eslint-disable-next-line no-empty
                } catch (e) {}
              }}
            ></Input>
          </Flex>

          <Flex pt="4" gap="2" justifyContent="end">
            <Button colorScheme="red" onClick={() => navigate('/my-auctions')}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleSaveAuction}>
              Save Auction
            </Button>
          </Flex>
        </Flex>
      </Container>

      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </>
  );
}
