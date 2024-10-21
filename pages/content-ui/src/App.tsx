import { useEffect } from 'react';
import { Button } from '@extension/ui';
import { useStorage } from '@extension/shared';
import { exampleThemeStorage } from '@extension/storage';
import { Connect } from './Connect';
import AlgorandProvider from './providers/AlgorandProvider';

export default function App() {
  const theme = useStorage(exampleThemeStorage);

  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return (
    <AlgorandProvider>
      <div>
        <h1>@txnlab/use-wallet-react</h1>
        <Connect />
        <div className="flex items-center justify-between gap-2 rounded bg-blue-100 px-2 py-1">
          <div className="flex gap-1 text-blue-500">
            Edit <strong className="text-blue-700">pages/content-ui/src/app.tsx</strong> and save to reload.
          </div>
          <Button theme={theme} onClick={exampleThemeStorage.toggle}>
            Toggle Theme
          </Button>
        </div>
      </div>
    </AlgorandProvider>
  );
}
