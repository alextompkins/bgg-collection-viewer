/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { BggGame, TGame } from "../types/types";
import convert from "xml-js";

type BggGamesContextProps = {
  children: ReactNode;
};

type BggGamesContextValue = {
  collection: TGame[] | null;
  setCollection: React.Dispatch<React.SetStateAction<TGame[] | null>>;
  allGames: TGame[] | null;
  gameWithSmallestPlaytime: TGame | null;
  gameWithLargestPlaytime: TGame | null;
  loading: boolean;
  error: string | null;
};

const BggGamesContext = createContext<BggGamesContextValue | undefined>(
  undefined
);

const BggGamesProvider: React.FC<BggGamesContextProps> = ({ children }) => {
  const [collection, setCollection] = useState<TGame[] | null>(null);
  const [allGames, setAllGames] = useState<TGame[] | null>(null);
  const [loading, setLoading] = useState<boolean | false>(true);
  const [error, setError] = useState<string | null>(null);

  const formatGames = (games: BggGame[]): TGame[] => {
    return games.map((game) => ({
      bggId: game._attributes.objectid,
      name: game.name._text,
      yearpublished: game.yearpublished._text,
      image: game.image._text,
      thumbnail: game.image._text,
      minplayers: parseInt(game.stats._attributes.minplayers),
      maxplayers: parseInt(game.stats._attributes.maxplayers),
      minplaytime: parseInt(game.stats._attributes.minplaytime),
      maxplaytime: parseInt(game.stats._attributes.maxplaytime),
      playingtime: parseInt(game.stats._attributes.playingtime),
      numplays: parseInt(game.numplays._text),
      comment: ('' || game.comment?._text),
      fortrade: parseInt(game.status._attributes.fortrade)
    }));
  };

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.geekdo.com/xmlapi/collection/hermokrates?own=1&excludesubtype=boardgameexpansion"
        );
        const data = JSON.parse(
          convert.xml2json(await response.text(), { compact: true, spaces: 2 })
        );
        const formattedGames = formatGames(data.items.item);
        setCollection(formattedGames);
        setAllGames(formattedGames);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data");
        setLoading(false);
      }
    };
    fetchData();

    return () => abortController.abort();
  }, []);

  const [gameWithSmallestPlaytime, setGameWithSmallestPlaytime] =
    useState<TGame | null>(null);

  const [gameWithLargestPlaytime, setGameWithLargestPlaytime] =
    useState<TGame | null>(null);

  useEffect(() => {
    if (allGames) {
      const minGame = allGames.reduce(
        (min, current) =>
          current.playingtime < min.playingtime ? current : min,
        allGames[0]
      );
      setGameWithSmallestPlaytime(minGame);

      const maxGame = allGames.reduce(
        (max, current) =>
          current.playingtime > max.playingtime ? current : max,
        allGames[0]
      );
      setGameWithLargestPlaytime(maxGame);
    }
  }, [allGames]);

  const value: BggGamesContextValue = {
    collection,
    setCollection,
    allGames,
    gameWithSmallestPlaytime,
    gameWithLargestPlaytime,
    loading,
    error,
  };

  return (
    <BggGamesContext.Provider value={value}>
      {children}
    </BggGamesContext.Provider>
  );
};

const useBggGamesContext = () => {
  const context = useContext(BggGamesContext);
  if (!context) {
    throw new Error(
      "useBggGamesContext must be used within a BggGamesProvider"
    );
  }
  return context;
};

export { BggGamesProvider, useBggGamesContext };
