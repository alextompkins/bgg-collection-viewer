import type { Game } from '../../models/game.ts';
import { parseIntStrict } from '../../utils/parseIntStrict.ts';
import type { ApiGame } from '../apiModels/apiGame.ts';

export const mapApiGame = (apiGame: ApiGame): Game => ({
  bggId: apiGame['@_objectid'],
  name: apiGame.name['#text'],
  yearPublished: apiGame.yearpublished,
  imageUrl: apiGame.image,
  thumbnailUrl: apiGame.thumbnail,
  minPlayers: parseIntStrict(apiGame.stats['@_minplayers'], () => undefined),
  maxPlayers: parseIntStrict(apiGame.stats['@_maxplayers'], () => undefined),
  minPlaytime: parseIntStrict(apiGame.stats['@_minplaytime'], () => undefined),
  maxPlaytime: parseIntStrict(apiGame.stats['@_maxplaytime'], () => undefined),
  playingTime: parseIntStrict(apiGame.stats['@_playingtime'], () => undefined),
  numPlays: apiGame.numplays,
  comment: apiGame.comment,
});
