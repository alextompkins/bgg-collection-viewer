interface ApiLink {
  '@_type':
    | 'boardgamecategory'
    | 'boardgamemechanic'
    | 'boardgamefamily'
    | 'boardgameexpansion'
    | 'boardgamepublisher'
    | 'boardgamedesigner'
    | 'boardgameartist';
  '@_id': string;
  '@_value': string;
}

export interface ApiThing {
  '@_id': string;
  description: string;
  link: ApiLink[];
}

export interface ApiThings {
  items: {
    item: ApiThing[];
  };
}
