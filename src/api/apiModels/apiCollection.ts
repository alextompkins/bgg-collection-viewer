import type { ApiGame } from './apiGame.ts';

export interface ApiCollection {
  items: {
    item: ApiGame[];
    '@_totalitems': string;
    '@_pubdate': string; // datetime
  };
}
