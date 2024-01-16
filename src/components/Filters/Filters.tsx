import { useBggGamesContext } from "../../context/BggGamesContext";

const Filters = () => {
  const { collection, setCollection, allGames } = useBggGamesContext();
  const selectRandomGame = () => {
    if (collection && allGames) {
      const collectionLength = allGames.length;
      const randomIndex = Math.floor(
        Math.random() * (collectionLength - 1) + 1
      );
      const randomGame = allGames[randomIndex];
      setCollection([randomGame]);
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
  const resetGames = () => {
    if (allGames) {
      setCollection(allGames);
    }
  };

  return (
    <div className="flex flex-row gap-4 align-middle w-full rounded-lg bg-slate-500 p-2">
      <span className="p-2">Filters:</span>
      <button
        className="bg-slate-400 hover:bg-slate-300 p-2 rounded-lg"
        type="button"
        onClick={selectRandomGame}
      >
        Random Game
      </button>
      <button
        type="button"
        onClick={selectSoloGames}
        className="bg-slate-400 hover:bg-slate-300 p-2 rounded-lg"
      >
        Solo Games
      </button>
      <button
        className="bg-slate-400 hover:bg-slate-300 p-2 rounded-lg"
        type="button"
        onClick={resetGames}
      >
        Reset
      </button>
    </div>
  );
};

export default Filters;
