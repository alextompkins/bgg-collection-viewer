import type { Collection } from '../../models/collection.ts';
import type { ApiCollection } from '../apiModels/apiCollection.ts';
import { mapApiGame } from './mapApiGame.ts';

export const mapApiCollection = (apiCollection: ApiCollection): Collection => ({
  lastUpdated: apiCollection.items['@_pubdate'],
  games: apiCollection.items.item.map(mapApiGame),
});
