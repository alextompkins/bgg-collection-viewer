import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

import { useBggGamesContext } from '../../context/BggGamesContext';

export const Filters = () => {
  const { collection, setCollection, allGames, gameWithSmallestPlaytime, gameWithLargestPlaytime } =
    useBggGamesContext();

  const [randomGameActive, setRandomGameActive] = useState(false);
  const selectRandomGame = () => {
    if (collection && allGames) {
      const collectionLength = allGames.length;
      const randomIndex = Math.floor(Math.random() * (collectionLength - 1) + 1);
      const randomGame = allGames[randomIndex];
      setCollection([randomGame]);
      setRandomGameActive(true);
    }
  };

  const selectSoloGames = () => {
    if (allGames) {
      const soloGames = allGames.filter((game) => {
        return game.minplayers === 1;
      });
      setCollection(soloGames);
    }
  };

  const [playTimeRange, setPlayTimeRange] = useState(0);

  const handlePlayTimeRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayTimeRange(parseInt(event.target.value));
  };

  useEffect(() => {
    if (gameWithLargestPlaytime) {
      setPlayTimeRange(gameWithLargestPlaytime.playingtime);
    }
  }, [gameWithLargestPlaytime]);

  useEffect(() => {
    if (playTimeRange && allGames) {
      const games = allGames.filter((game) => {
        return game.playingtime <= playTimeRange;
      });
      setCollection(games);
    }
  }, [playTimeRange, setCollection, allGames]);

  const selectForSaleGames = () => {
    if (allGames) {
      const forSaleGames = allGames.filter((game) => {
        return game.fortrade === 1;
      });
      setCollection(forSaleGames);
    }
  };

  const resetGames = () => {
    if (allGames) {
      setCollection(allGames);
      setRandomGameActive(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 align-middle w-full rounded-lg bg-slate-200 p-2 drop-shadow-md">
      <span className="p-2 leading-[2]">Filters:</span>
      <div className="p-2 flex align-middle">
        <span className="leading-[2]">Avg. Play Time: </span>
        <input
          className="ml-4"
          type="range"
          step={10}
          min={gameWithSmallestPlaytime?.playingtime}
          max={gameWithLargestPlaytime?.playingtime}
          value={playTimeRange}
          onChange={handlePlayTimeRangeChange}
        />
        <span className="ml-4 leading-[2]">{playTimeRange} mins or less</span>
      </div>
      <button
        className={`bg-slate-200 hover:bg-slate-300 p-2 rounded-lg ${randomGameActive ? 'bg-slate-300' : ''}`}
        type="button"
        onClick={selectRandomGame}
      >
        Random Game
      </button>
      <button
        className="bg-slate-200 hover:bg-slate-300 p-2 rounded-lg"
        type="button"
        onClick={selectForSaleGames}
      >
        For Sale
      </button>
      <button
        type="button"
        onClick={selectSoloGames}
        className="bg-slate-200 hover:bg-slate-300 p-2 rounded-lg"
      >
        Solo Games
      </button>
      <button
        className="bg-slate-200 hover:bg-slate-300 p-2 rounded-lg"
        type="button"
        onClick={resetGames}
      >
        Reset
      </button>
    </div>
  );
};
