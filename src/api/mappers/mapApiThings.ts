import { parseEntities } from 'parse-entities';

import type { GameAugmentation } from '../../models/game.ts';
import type { ApiThing, ApiThings } from '../apiModels/apiThing.ts';

export const mapApiThings = (apiThings: ApiThings): GameAugmentation[] =>
  apiThings.items.item.map(mapApiThing);

const mapType = (
  type: ApiThing['link'][number]['@_type'],
): 'mechanics' | 'publishers' | 'families' | 'designers' | undefined => {
  switch (type) {
    case 'boardgamemechanic':
      return 'mechanics';
    case 'boardgamefamily':
      return 'families';
    case 'boardgamepublisher':
      return 'publishers';
    case 'boardgamedesigner':
      return 'designers';
    default:
      // Unmapped
      return undefined;
  }
};

const mapApiThing = (apiThing: ApiThing): GameAugmentation => {
  const augmentation: GameAugmentation = {
    bggId: apiThing['@_id'],
    description: apiThing.description ? parseEntities(apiThing.description) : undefined,
  };

  for (const link of apiThing.link) {
    const type = mapType(link['@_type']);
    if (!type) continue;

    augmentation[type] = [
      ...(augmentation[type] ?? []),
      { name: link['@_value'], id: link['@_id'] },
    ];
  }

  return augmentation;
};
