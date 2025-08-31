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
    <>
      <div>
        <input
          type="text"
          value={searchText}
          placeholder="Search..."
          onInput={onSearchTextChange}
        />
        <label>
          <span>Avg. Play Time: </span>
          <input
            type="range"
            step={10}
            min={gameWithSmallestPlaytime.value?.maxPlaytime}
            max={gameWithLargestPlaytime.value?.maxPlaytime}
            value={playtimeCannotExceed}
            onInput={handlePlayTimeRangeChange}
          />
          <span>{playtimeCannotExceed.value} mins or less</span>
        </label>
        <label>
          <span># players</span>
          <input
            value={numberOfPlayers.value}
            type="number"
            onInput={handleNumberOfPlayersChange}
          />
        </label>
      </div>
      <div>
        <button type="button" onClick={selectRandomGame}>
          Random Game
        </button>
        <button type="button" onClick={resetFilters}>
          Reset
        </button>
      </div>
    </>
  );
};
