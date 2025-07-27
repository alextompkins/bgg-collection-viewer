export interface Game {
  bggId: string;
  name: string;
  yearPublished: number;
  imageUrl: string;
  thumbnailUrl: string;
  minPlayers?: number;
  maxPlayers?: number;
  minPlaytime?: number;
  maxPlaytime?: number;
  playingTime?: number;
  numPlays: number;
  comment?: string;
}
