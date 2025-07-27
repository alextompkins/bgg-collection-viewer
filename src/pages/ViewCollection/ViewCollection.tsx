import { DocumentResizeObserver } from '../../components/DocumentResizeObserver.tsx';
import { Filters } from '../../components/Filters/Filters';
import { GamesList } from '../../components/GamesList/GamesList';
import { StoreProvider } from '../../context/StoreProvider.tsx';
import { collectionStore, CollectionStoreContext } from '../../stores/collectionStore.ts';

export const ViewCollection = () => (
  <DocumentResizeObserver>
    <StoreProvider context={CollectionStoreContext} storeFn={collectionStore}>
      <Filters />
      <GamesList />
    </StoreProvider>
  </DocumentResizeObserver>
);
