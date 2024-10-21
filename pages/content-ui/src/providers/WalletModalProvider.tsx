/* eslint-disable @next/next/no-img-element */
'use client';
import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useWallet, Wallet } from '@txnlab/use-wallet-react';
import { Button } from '@extension/ui';

type WalletModalContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};
const WalletModalContext = createContext<WalletModalContextType>({
  open: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setOpen: (value: boolean) => {},
});

const WalletModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { wallets, activeWallet } = useWallet();

  const handleConnect = async (wallet: Wallet) => {
    if (activeWallet) {
      await activeWallet.disconnect();
    }
    await wallet.connect();
  };
  return (
    <WalletModalContext.Provider
      value={{
        open,
        setOpen,
      }}>
      <div className="absolute right-0 top-20 size-52 rounded p-2 shadow-md">
        {wallets.map(wallet => (
          <Button key={wallet.id} onClick={() => handleConnect(wallet)}>
            <div className="flex items-center justify-start gap-3">
              <img src={wallet.metadata.icon} alt={wallet.metadata.name} className="size-6" />
              {wallet.metadata.name}
            </div>
          </Button>
          // <Button
          //   key={wallet.id}
          //   onClick={() => handleConnect(wallet)}
          //   className="flex items-center justify-between gap-3 uppercase"
          //   size={"lg"}
          //   variant={"outline"}
          //   disabled={wallet.isConnected}
          // >
          //   <div className="flex items-center justify-start gap-3">
          //     <img
          //       src={wallet.metadata.icon}
          //       alt={wallet.metadata.name}
          //       className="size-6"
          //     />
          //     {wallet.metadata.name}
          //   </div>
          //   {wallet.isConnected ? (
          //     <Text>Connected</Text>
          //   ) : null}
          // </Button>
        ))}
      </div>
      {children}
    </WalletModalContext.Provider>
  );
};

export default WalletModalProvider;
export const useWalletModal = () => useContext(WalletModalContext);
