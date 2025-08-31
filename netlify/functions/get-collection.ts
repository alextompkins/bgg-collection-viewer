// noinspection JSUnusedGlobalSymbols
/* eslint-disable import/no-default-export */

import type { Config, Context } from '@netlify/functions';

import { getCollection } from '../../src/api/bggApi';

export const config: Config = {
  method: 'GET',
  path: '/api/collection/:collectionId',
};

async function getCollectionFn(_request: Request, context: Context): Promise<Response> {
  const { collectionId } = context.params;

  if (!collectionId) return new Response('collectionId param missing', { status: 400 });

  const collection = await getCollection(collectionId);

  return new Response(JSON.stringify(collection), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export default getCollectionFn;
