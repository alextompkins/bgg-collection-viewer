import { useEffect } from 'preact/hooks';

import type { Game } from '../../models/game.ts';
import { useCollectionStore } from '../../stores/collectionStore.ts';
import { GameTile } from '../Game/GameTile.tsx';

export const GamesList = () => {
  const { filteredGames, loading, error, loadCollection } = useCollectionStore();

  useEffect(() => loadCollection(), [loadCollection]);

  if (loading.value) {
    return <p>Loading...</p>;
  }

  if (error.value) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {filteredGames.value?.map((game: Game) => (
        <div key={game.bggId} className="col-span-1">
          <GameTile {...game} key={game.bggId} />
        </div>
      ))}
    </div>
  );
};
