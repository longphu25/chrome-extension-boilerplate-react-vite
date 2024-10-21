'use client';
import type { PropsWithChildren } from 'react';
import AlgorandProvider from './AlgorandProvider';
import WalletModalProvider from './WalletModalProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AlgorandProvider>
        <WalletModalProvider>{children}</WalletModalProvider>
      </AlgorandProvider>
    </QueryClientProvider>
  );
};
