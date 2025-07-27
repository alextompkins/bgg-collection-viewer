import { parseXml } from '../utils/parseXml.ts';
import { mapApiCollection } from './mappers/mapApiCollection.ts';

const ENDPOINTS = {
  collection: (id: string) =>
    `${import.meta.env.VITE_API_URL}/collection/${id}?own=1&excludesubtype=boardgameexpansion`,
};

export async function getCollection(collectionId: string) {
  const response = await fetch(ENDPOINTS.collection(collectionId));
  const text = await response.text();

  return mapApiCollection(parseXml(text));
}
