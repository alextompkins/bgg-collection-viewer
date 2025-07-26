import { XMLParser } from 'fast-xml-parser';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useState } from 'react';

import type { TGame } from '../types/types';

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

const BggGamesContext = createContext<BggGamesContextValue | undefined>(undefined);

const BggGamesProvider = ({ children }: BggGamesContextProps) => {
  const [collection, setCollection] = useState<TGame[] | null>(null);
  const [allGames, setAllGames] = useState<TGame[] | null>(null);
  const [_formattedGames, setFormattedGames] = useState<TGame[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatGames = (games: any[]): TGame[] => {
    console.log('Games to format:', games);
    return games.map((game) => ({
      bggId: game['@_objectid'] || '',
      name: game.name['#text'] || '',
      yearpublished: game.yearpublished || '',
      image: game.image || '',
      thumbnail: game.thumbnail || '',
      minplayers: parseInt(game.stats['@_minplayers']) || 0,
      maxplayers: parseInt(game.stats['@_maxplayers']) || 0,
      minplaytime: parseInt(game.stats['@_minplaytime']) || 0,
      maxplaytime: parseInt(game.stats['@_maxplaytime']) || 0,
      playingtime: parseInt(game.stats['@_playingtime']) || 0,
      numplays: parseInt(game.numplays) || 0,
      comment: game.comment || '',
      fortrade: parseInt(game.status['@_fortrade']) || 0,
    }));
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          'https://api.geekdo.com/xmlapi/collection/boardgaymesjames?own=1&excludesubtype=boardgameexpansion',
        );
        const text = await response.text();
        const parser = new XMLParser({ htmlEntities: true, ignoreAttributes: false });
        const data = parser.parse(text);
        console.log('Fetched data:', data);
        if (data.items && data.items.item) {
          const formatted = formatGames(data.items.item);
          console.log('Formatted games:', formatted);
          setFormattedGames(formatted);
          setAllGames(formatted); // Ensure allGames is set
        } else {
          throw new Error('Invalid data structure');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Failed to fetch games');
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const [gameWithSmallestPlaytime, setGameWithSmallestPlaytime] = useState<TGame | null>(null);

  const [gameWithLargestPlaytime, setGameWithLargestPlaytime] = useState<TGame | null>(null);

  useEffect(() => {
    if (allGames) {
      const minGame = allGames.reduce(
        (min, current) => (current.playingtime < min.playingtime ? current : min),
        allGames[0],
      );
      setGameWithSmallestPlaytime(minGame);

      const maxGame = allGames.reduce(
        (max, current) => (current.playingtime > max.playingtime ? current : max),
        allGames[0],
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

  return <BggGamesContext.Provider value={value}>{children}</BggGamesContext.Provider>;
};

const useBggGamesContext = () => {
  const context = useContext(BggGamesContext);
  if (!context) {
    throw new Error('useBggGamesContext must be used within a BggGamesProvider');
  }
  return context;
};

export { BggGamesProvider, useBggGamesContext };
