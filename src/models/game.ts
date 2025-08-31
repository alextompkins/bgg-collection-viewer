import type { Designer } from './designer.ts';
import type { Family } from './family.ts';
import type { Mechanic } from './mechanic.ts';
import type { Publisher } from './publisher.ts';

export type Game = {
  bggId: string;
  name: string;
  yearPublished: number;
  imageUrl: string;
  thumbnailUrl: string;
  minPlayers?: number;
  maxPlayers?: number;
  minPlaytime?: number;
  maxPlaytime?: number;
  avgPlaytime?: number;
  numPlays: number;
  comment?: string;
} & GameAugmentation;

export interface GameAugmentation {
  // augmented via Thing endpoint
  bggId: string;
  description?: string;
  mechanics?: Mechanic[];
  families?: Family[];
  publishers?: Publisher[];
  designers?: Designer[];
}
