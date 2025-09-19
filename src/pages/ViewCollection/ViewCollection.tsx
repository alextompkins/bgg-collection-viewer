import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

import { Filters } from '../../components/Filters/Filters';
import { GamesList } from '../../components/GamesList/GamesList';
import { StoreProvider } from '../../context/StoreProvider.tsx';
import { collectionStore, CollectionStoreContext } from '../../stores/collectionStore.ts';
import { theme } from '../../theme.ts';

interface ViewCollectionProps {
  collectionid: string;
}

export const ViewCollection = ({ collectionid }: ViewCollectionProps) => (
  <MantineProvider theme={theme}>
    <StoreProvider context={CollectionStoreContext} storeFn={() => collectionStore(collectionid)}>
      <Filters />
      <GamesList />
    </StoreProvider>
  </MantineProvider>
);
