import type { Game } from './game.ts';

export interface Collection {
  games: Game[];
  lastUpdated: string; // datetime
}
