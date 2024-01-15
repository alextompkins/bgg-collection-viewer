import useBggGames from "../../hooks/useBggGames";

const Games = () => {
  const { collection, setCollection, allGames, loading, error } = useBggGames();
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
  const resetGames = () => {
    if (allGames) {
      setCollection(allGames);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
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
          className="bg-slate-400 hover:bg-slate-300 p-2 rounded-lg"
          type="button"
          onClick={resetGames}
        >
          Reset
        </button>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {collection?.map((game) => (
          <div
            className="flex flex-col rounded-lg shadow border-gray-700 bg-gray-800 my-4"
            key={game.bggId}
          >
            <div className="w-full h-64 min-h-64 max-h-64">
              <img
                src={game.thumbnail}
                alt={game.name}
                className="object-cover object-top h-full w-full"
              />
            </div>

            <div className="flex flex-col h-full p-4 leading-normal">
              <h2 className="mb-2 text-2xl font-bold tracking-tight">
                {game.name}
              </h2>
              <p>Year Published: {game.yearpublished}</p>
              <p>Min Players: {game.minplayers}</p>
              <p>Max Players: {game.maxplayers}</p>
              <p>Min Playtime: {game.minplaytime} minutes</p>
              <p>Max Playtime: {game.maxplaytime} minutes</p>
              <p>Playing Time: {game.playingtime} minutes</p>
              <p>Number of Plays: {game.numplays}</p>
            </div>
            <a
              className="w-full mt-4 p-4 bg-blue-900 hover:bg-slate-900 rounded-lg"
              href={`https://boardgamegeek.com/boardgame/${game.bggId}`}
              target="_blank"
            >
              View on BGG
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Games;
