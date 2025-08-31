// noinspection JSUnusedGlobalSymbols
/* eslint-disable import/no-default-export */

import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';

import type { Collection } from '../../src/models/collection';

export const config: Config = {
  schedule: '*/5 * * * *', // every 5 minutes
};

async function processCollectionFn(_request: Request, _context: Context) {
  console.log(`scheduled function at ${new Date().toISOString()}`);

  const collectionStore = getStore('collections');
  const collectionIds = (await collectionStore.list()).blobs.map((blob) => blob.key);
  const collection = JSON.parse(await collectionStore.get(collectionIds[0])) as Collection;

  console.log(collection.games.length);

  // await Promise.all(collection.games.map((game) => getThing(game.bggId)));
}

export default processCollectionFn;
