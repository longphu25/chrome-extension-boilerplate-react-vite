'use client';
import type { PropsWithChildren } from 'react';
import React from 'react';
import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react';

const walletManager = new WalletManager({
  wallets: [WalletId.DEFLY, WalletId.PERA],
  network: NetworkId.TESTNET,
});

const AlgorandProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <WalletProvider manager={walletManager}>{children}</WalletProvider>;
};

export default AlgorandProvider;
