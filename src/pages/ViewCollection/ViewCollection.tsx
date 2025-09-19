import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { useRef } from 'preact/hooks';

import { Filters } from '../../components/Filters/Filters';
import { GamesList } from '../../components/GamesList/GamesList';
import { StoreProvider } from '../../context/StoreProvider.tsx';
import { collectionStore, CollectionStoreContext } from '../../stores/collectionStore.ts';
import { theme } from '../../theme.ts';

interface ViewCollectionProps {
  collectionid: string;
}

export const ViewCollection = ({ collectionid }: ViewCollectionProps) => {
  const root = useRef<HTMLDivElement>(null);

  return (
    <div ref={root} id="root">
      <MantineProvider
        theme={theme}
        getRootElement={() => root.current!}
        cssVariablesSelector="#root"
      >
        <StoreProvider
          context={CollectionStoreContext}
          storeFn={() => collectionStore(collectionid)}
        >
          <Filters />
          <GamesList />
        </StoreProvider>
      </MantineProvider>
    </div>
  );
};
