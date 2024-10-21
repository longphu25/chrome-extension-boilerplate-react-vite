import { useEffect } from 'react';
import { Card } from '@extension/ui';
// import { useStorage } from '@extension/shared';
// import { exampleThemeStorage } from '@extension/storage';
import type { ActionGetResponse } from './types/Action.type';

interface CardLayoutProps {
  data: ActionGetResponse;
  originalUrl: URL;
}

const CardLayout: React.FC<CardLayoutProps> = ({ data, originalUrl }) => {
  // const theme = useStorage(exampleThemeStorage);

  useEffect(() => {
    console.log('content ui loaded');
  }, []);

  return (
    <div className="items-center justify-between gap-2 rounded bg-blue-100 px-2 py-1">
      <Card theme={'dark'} title={data.title} description={data.description} imageUrl={data.icon}></Card>
    </div>
  );
};

export default CardLayout;
