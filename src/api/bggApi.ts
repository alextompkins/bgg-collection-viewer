import { parseXml } from '../utils/parseXml.ts';
import { mapApiCollection } from './mappers/mapApiCollection.ts';

const ENDPOINTS = {
  collection: (id: string) =>
    `${process.env.VITE_API_URL}/xmlapi2/collection?username=${id}&own=1&stats=1&excludesubtype=boardgameexpansion`,
  thing: (id: string) => `${process.env.VITE_API_URL}/xmlapi2/thing?id=${id}`,
};

export async function getCollection(collectionId: string) {
  const response = await fetch(ENDPOINTS.collection(collectionId));
  const text = await response.text();

  return mapApiCollection(parseXml(text));
}
