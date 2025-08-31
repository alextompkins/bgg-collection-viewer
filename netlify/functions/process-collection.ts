// noinspection JSUnusedGlobalSymbols
/* eslint-disable import/no-default-export */

import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';

import { getGameDetails } from '../../src/api/bggApi';
import type { Collection } from '../../src/models/collection';
import type { GameAugmentation } from '../../src/models/game';
import { delay } from '../../src/utils/delay';

export const config: Config = {
  schedule: '*/30 * * * *', // every 30 minutes
};

const GAMES_PER_SHARD = 20;
const REQUEST_INTERVAL = 20;

async function processCollectionFn(_request: Request, _context: Context) {
  const collectionStore = getStore('collections');
  const collectionIds = (await collectionStore.list()).blobs.map((blob) => blob.key);
  // Just do the one collection for now
  const collectionId = process.env.VITE_DEFAULT_COLLECTION ?? collectionIds[0];
  const collection = JSON.parse(await collectionStore.get(collectionId)) as Collection;

  const gameIds = collection.games.map((game) => game.bggId);
  const gameDetails: GameAugmentation[] = [];

  const shardTotal = Math.ceil(gameIds.length / GAMES_PER_SHARD);
  for (let shardIndex = 0; shardIndex < shardTotal; shardIndex++) {
    const idsToFetch = gameIds.slice(
      shardIndex * GAMES_PER_SHARD,
      (shardIndex + 1) * GAMES_PER_SHARD,
    );
    await delay(REQUEST_INTERVAL);
    try {
      console.log(`Fetching shard ${shardIndex + 1}/${shardTotal} (${idsToFetch.length} games)`);
      gameDetails.push(...(await getGameDetails(idsToFetch)));
    } catch {
      console.warn(`Shard ${shardIndex + 1}/${shardTotal} failed`);
    }
  }

  const updatedCollection: Collection = {
    ...collection,
    games: collection.games.map((game) => {
      const matching = gameDetails.find((details) => details.bggId === game.bggId);
      return matching
        ? {
            ...game,
            ...matching,
          }
        : game;
    }),
  };

  // Put the augmented collection into the store
  await collectionStore.setJSON(collectionId, updatedCollection);
}

export default processCollectionFn;
