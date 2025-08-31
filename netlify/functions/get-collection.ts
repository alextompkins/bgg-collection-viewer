// noinspection JSUnusedGlobalSymbols
/* eslint-disable import/no-default-export */

import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';

import { getCollection } from '../../src/api/bggApi';
import type { Collection } from '../../src/models/collection';

export const config: Config = {
  method: 'GET',
  path: '/api/collection/:collectionId',
};

async function getCollectionFn(_request: Request, context: Context): Promise<Response> {
  const { collectionId } = context.params;
  if (!collectionId) return new Response('collectionId param missing', { status: 400 });

  const collectionStore = getStore('collections');
  const cachedCollection = await collectionStore.get(collectionId);

  let collection: Collection;

  if (cachedCollection) {
    collection = JSON.parse(cachedCollection);
  } else {
    collection = await getCollection(collectionId);

    // Put it in the cache for future requests
    // We don't need to wait for this
    collectionStore.setJSON(collectionId, collection).catch(console.error);
  }

  return new Response(JSON.stringify(collection), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default getCollectionFn;
