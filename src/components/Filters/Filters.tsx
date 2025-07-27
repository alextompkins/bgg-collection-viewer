import type { JSX } from 'preact';

import { useCollectionStore } from '../../stores/collectionStore.ts';
import { parseIntStrict } from '../../utils/parseIntStrict.ts';

export const Filters = () => {
  const {
    gameWithLargestPlaytime,
    gameWithSmallestPlaytime,
    filters: { numberOfPlayers, playtimeCannotExceed, searchText },
    resetFilters,
    selectRandomGame,
  } = useCollectionStore();

  const onSearchTextChange = (e: JSX.TargetedInputEvent<HTMLInputElement>) => {
    searchText.value = (e.target as HTMLInputElement).value;
  };

  const handleNumberOfPlayersChange = (e: JSX.TargetedInputEvent<HTMLInputElement>) => {
    const inputEl = e.target as HTMLInputElement;
    const parsed = parseInt(inputEl.value);

    if (Number.isNaN(parsed) || parsed < 1) {
      e.preventDefault();
      inputEl.value = `${numberOfPlayers.value}`;
    } else {
      numberOfPlayers.value = parsed;
    }
  };

  const handlePlayTimeRangeChange = (event: JSX.TargetedInputEvent<HTMLInputElement>) => {
    playtimeCannotExceed.value = parseIntStrict((event.target as HTMLInputElement).value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 align-middle w-full rounded-lg bg-slate-200 p-2 drop-shadow-md">
      <span className="p-2 leading-[2]">Filters:</span>
      <label className="p-2 flex align-middle">
        <span className="ml-4 leading-[2]">Search</span>
        <input className="ml-4" type="text" value={searchText} onInput={onSearchTextChange} />
      </label>
      <label className="p-2 flex align-middle">
        <span className="leading-[2]">Avg. Play Time: </span>
        <input
          className="ml-4"
          type="range"
          step={10}
          min={gameWithSmallestPlaytime.value?.maxPlaytime}
          max={gameWithLargestPlaytime.value?.maxPlaytime}
          value={playtimeCannotExceed}
          onInput={handlePlayTimeRangeChange}
        />
        <span className="ml-4 leading-[2]">{playtimeCannotExceed.value} mins or less</span>
      </label>
      <button
        className={`bg-slate-200 hover:bg-slate-300 p-2 rounded-lg`}
        type="button"
        onClick={selectRandomGame}
      >
        Random Game
      </button>
      <label className="bg-slate-200 hover:bg-slate-300 p-2 rounded-lg">
        <span className="leading-[2]"># players</span>
        <input value={numberOfPlayers.value} type="number" onInput={handleNumberOfPlayersChange} />
      </label>
      <button
        className="bg-slate-200 hover:bg-slate-300 p-2 rounded-lg"
        type="button"
        onClick={resetFilters}
      >
        Reset
      </button>
    </div>
  );
};
