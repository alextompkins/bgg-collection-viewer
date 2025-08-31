import { Grid } from '@mantine/core';
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
    <Grid columns={12}>
      {filteredGames.value?.map((game: Game) => (
        <Grid.Col
          key={game.bggId}
          span={{
            base: 6,
            md: 4,
            lg: 2,
          }}
        >
          <GameTile {...game} key={game.bggId} />
        </Grid.Col>
      ))}
    </Grid>
  );
};
