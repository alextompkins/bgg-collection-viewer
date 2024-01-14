export type BggGame = {
  _attributes: {
    objecttype: string;
    objectid: string;
    subtype: string;
    collid: string;
  };
  name: { _attributes: { sortindex: string }; _text: string };
  yearpublished: { _text: string };
  image: {
    _text: string;
  };
  thumbnail: {
    _text: string;
  };
  stats: {
    _attributes: {
      minplayers: "1";
      maxplayers: "4";
      minplaytime: "60";
      maxplaytime: "90";
      playingtime: "90";
      numowned: "1790";
    };
    rating: {
      _attributes: [object];
      usersrated: [object];
      average: [object];
      bayesaverage: [object];
      stddev: [object];
      median: [object];
    };
  };
  status: {
    _attributes: {
      own: string;
      prevowned: string;
      fortrade: string;
      want: string;
      wanttoplay: string;
      wanttobuy: string;
      wishlist: string;
      preordered: string;
      lastmodified: string;
    };
  };
  numplays: { _text: string };
};

export type Game = {
  bggId: string;
  name: string;
  yearpublished: string;
  image: string;
  thumbnail: string;
  minplayers: number;
  maxplayers: number;
  minplaytime: number;
  maxplaytime: number;
  playingtime: number;
  numplays: number;
};
