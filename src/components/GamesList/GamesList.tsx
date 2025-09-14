import { Grid } from '@mantine/core';
import type { ComponentChildren } from 'preact';
import type { ForwardedRef } from 'preact/compat';
import { forwardRef } from 'preact/compat';
import { useEffect, useRef } from 'preact/hooks';

import { useIsVisible } from '../../hooks/useIsVisible.ts';
import type { Game } from '../../models/game.ts';
import { useCollectionStore } from '../../stores/collectionStore.ts';
import { GameTile } from '../Game/GameTile.tsx';

const Observer = forwardRef(
  ({ children }: { children: ComponentChildren }, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref}>{children}</div>
  ),
);

export const GamesList = () => {
  const { shownGames, loading, error, showMore } = useCollectionStore();
  const endOfListRef = useRef<HTMLDivElement>(null);
  const atEndOfList = useIsVisible(endOfListRef);

  useEffect(() => {
    console.log('atEndOfList', atEndOfList);
    if (atEndOfList) {
      showMore();
    }
  }, [showMore, atEndOfList]);

  if (loading.value) {
    return <p>Loading...</p>;
  }

  if (error.value) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Grid columns={12}>
        {shownGames.value.map((game: Game) => (
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
      <Observer ref={endOfListRef}>Loading more</Observer>
    </>
  );
};
