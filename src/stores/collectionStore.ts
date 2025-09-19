import { computed, type ReadonlySignal, type Signal, signal } from '@preact/signals';
import { createContext } from 'preact';

import { getCollection } from '../api/functionsApi.ts';
import { useStore } from '../context/StoreProvider.tsx';
import type { Game } from '../models/game.ts';
import type { UnwrapSignals } from '../utils/unwrapSignals.ts';

export interface CollectionStore {
  shownGames: ReadonlySignal<Game[]>;
  gameWithSmallestPlaytime: ReadonlySignal<Game | undefined>;
  gameWithLargestPlaytime: ReadonlySignal<Game | undefined>;
  loading: ReadonlySignal<boolean>;
  error: ReadonlySignal<string | undefined>;
  filters: {
    playtimeCannotExceed: Signal<number>;
    numberOfPlayers: Signal<number>;
    searchText: Signal<string>;
  };
  showMore(): void;
  resetFilters(): void;
  selectRandomGame(): void;
}

const DEFAULT_FILTERS: UnwrapSignals<CollectionStore['filters']> = {
  playtimeCannotExceed: 180, // 3 hours
  numberOfPlayers: 4,
  searchText: '',
};

export const collectionStore = (collectionId: string): CollectionStore => {
  const allGames = signal<Game[]>();
  const loading = signal(false);
  const error = signal<string>();
  const filters: CollectionStore['filters'] = {
    playtimeCannotExceed: signal(DEFAULT_FILTERS.playtimeCannotExceed),
    numberOfPlayers: signal(DEFAULT_FILTERS.numberOfPlayers),
    searchText: signal(DEFAULT_FILTERS.searchText),
  };
  const numGamesToShow = signal(0);

  async function fetchCollection() {
    loading.value = true;
    try {
      const collection = await getCollection(collectionId);
      allGames.value = collection.games;
    } catch (e) {
      console.error('Error fetching games:', e);
      error.value = 'Failed to fetch games';
    } finally {
      loading.value = false;
    }
  }

  function showMore() {
    if (allGames.value === undefined) {
      console.log('fetching games for the first time');
      fetchCollection().catch(console.error);
    }

    numGamesToShow.value += 20;
    console.log('showing 20 more games', numGamesToShow.value);
  }

  function resetFilters() {
    filters.playtimeCannotExceed.value = DEFAULT_FILTERS.playtimeCannotExceed;
    filters.numberOfPlayers.value = DEFAULT_FILTERS.numberOfPlayers;
    filters.searchText.value = DEFAULT_FILTERS.searchText;
  }

  function selectRandomGame() {
    if (!allGames.value) return;

    const collectionLength = allGames.value.length;
    const randomIndex = Math.floor(Math.random() * (collectionLength - 1) + 1);
    const randomGame = allGames.value[randomIndex];
    filters.searchText.value = randomGame.name;
  }

  const gameWithSmallestPlaytime = computed(
    () =>
      allGames.value?.reduce(
        (min, current) =>
          current.avgPlaytime && current.avgPlaytime < (min.avgPlaytime ?? Infinity)
            ? current
            : min,
        allGames.value[0],
      ) ?? undefined,
  );

  const gameWithLargestPlaytime = computed(
    () =>
      allGames.value?.reduce(
        (max, current) =>
          current.avgPlaytime && current.avgPlaytime > (max.avgPlaytime ?? 0) ? current : max,
        allGames.value[0],
      ) ?? undefined,
  );

  const filteredGames = computed(() => {
    if (!allGames.value) return [];

    return allGames.value
      .filter((game) => game.maxPlaytime && game.maxPlaytime <= filters.playtimeCannotExceed.value)
      .filter((game) =>
        filters.numberOfPlayers.value
          ? filters.numberOfPlayers.value >= (game.minPlayers ?? 1) &&
            filters.numberOfPlayers.value <= (game.maxPlayers ?? Infinity)
          : true,
      )
      .filter((game) =>
        filters.searchText.value
          ? game.name.toLowerCase().includes(filters.searchText.value.toLowerCase())
          : true,
      );
  });

  const shownGames = computed(() => filteredGames.value.slice(0, numGamesToShow.value));

  return {
    shownGames,
    gameWithSmallestPlaytime,
    gameWithLargestPlaytime,
    loading,
    error,
    filters,
    showMore,
    resetFilters,
    selectRandomGame,
  };
};

export const CollectionStoreContext = createContext<CollectionStore | undefined>(undefined);
export const useCollectionStore = () => useStore(CollectionStoreContext);
