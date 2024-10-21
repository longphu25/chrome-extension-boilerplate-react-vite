import React from 'react';
import type { ActionGetResponse, LinkedAction } from '../types/Action.type';
// import { useWallet, Wallet } from "@txnlab/use-wallet-react";

import {
  ChakraProvider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Image,
  Stack,
  Button,
  Divider,
  ButtonGroup,
} from '@chakra-ui/react';

interface BoxProps {
  data: ActionGetResponse;
}

const Box: React.FC<BoxProps> = ({ data }) => {
  // const { wallets, activeWallet, activeAddress, transactionSigner } = useWallet();

  // const handleConnect = async (wallet: Wallet) => {
  //   if (activeWallet) {
  //     await activeWallet.disconnect();
  //   }
  //   await wallet.connect();
  // };

  // console.log('activeAddress', activeAddress);
  return (
    <React.StrictMode>
      <ChakraProvider>
        <Card align="center">
          <CardHeader>
            <Heading size="md">Algorand Pin Box</Heading>
          </CardHeader>
          <CardBody>
            <Image src={data.icon} alt={data.title} boxSize="sm" objectFit="cover" />
            <Stack mt="6" spacing="3">
              <Heading size="md">{data.title}</Heading>
              <Text>{data.description}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="3">
              {data.links.actions.map((action: LinkedAction, index: number) => (
                <Button key={index} variant="solid" colorScheme="teal">
                  {action.label}
                </Button>
              ))}
            </ButtonGroup>
          </CardFooter>
        </Card>
      </ChakraProvider>
    </React.StrictMode>
  );
};

export default Box;
