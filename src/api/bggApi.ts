import { parseXml } from '../utils/parseXml.ts';
import { mapApiCollection } from './mappers/mapApiCollection.ts';
import { mapApiThings } from './mappers/mapApiThings.ts';

const ENDPOINTS = {
  collection: (id: string) =>
    `${process.env.VITE_API_URL}/xmlapi2/collection?username=${id}&own=1&stats=1&excludesubtype=boardgameexpansion`,
  thing: (ids: string[]) => `${process.env.VITE_API_URL}/xmlapi2/thing?id=${ids.join(',')}`,
};

export async function getCollection(collectionId: string) {
  const response = await fetch(ENDPOINTS.collection(collectionId));
  const text = await response.text();

  return mapApiCollection(parseXml(text));
}

export async function getGameDetails(gameIds: string[]) {
  if (gameIds.length > 20) {
    throw new Error("Can't retrieve more than 20 games at a time.");
  }

  const response = await fetch(ENDPOINTS.thing(gameIds));
  const text = await response.text();

  return mapApiThings(parseXml(text));
}
