export interface ApiGame {
  name: {
    '#text': string;
  };
  yearpublished: number;
  image: string;
  thumbnail: string;
  stats: {
    rating: {
      usersrated: {
        '@_value': string;
      };
      average: {
        '@_value': string;
      };
      bayesaverage: {
        '@_value': string;
      };
      stddev: {
        '@_value': string;
      };
      median: {
        '@_value': string;
      };
      '@_value': string;
    };
    '@_minplayers': string;
    '@_maxplayers': string;
    '@_minplaytime': string;
    '@_maxplaytime': string;
    '@_playingtime': string;
    '@_numowned': string;
  };
  status: {
    '@_own': string;
    '@_prevowned': string;
    '@_fortrade': string;
    '@_want': string;
    '@_wanttoplay': string;
    '@_wanttobuy': string;
    '@_wishlist': string;
    '@_preordered': string;
    '@_lastmodified': string; // datetime
  };
  numplays: number;
  comment?: string;
  haspartslist: string;
  '@_objecttype': 'thing';
  '@_objectid': string;
  '@_subtype': 'boardgame';
  '@_collid': string;
}
