// noinspection JSUnusedGlobalSymbols
/* eslint-disable import/no-default-export */

import { getStore } from '@netlify/blobs';
import type { Config, Context } from '@netlify/functions';

import { getCollection } from '../../src/api/bggApi';

export const config: Config = {
  method: 'GET',
  path: '/api/collection/:collectionId',
};

async function getCollectionFn(_request: Request, context: Context): Promise<Response> {
  const { collectionId } = context.params;
  if (!collectionId) return new Response('collectionId param missing', { status: 400 });

  const collectionStore = getStore('collections');
  const cachedCollection = await collectionStore.get(collectionId);
  console.log('cachedCollection', JSON.parse(cachedCollection));

  const collection = cachedCollection
    ? JSON.parse(cachedCollection)
    : await getCollection(collectionId);

  if (!cachedCollection) {
    collectionStore.setJSON(collectionId, collection).catch(console.error); // don't need to wait for this
  }

  return new Response(JSON.stringify(collection), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default getCollectionFn;
