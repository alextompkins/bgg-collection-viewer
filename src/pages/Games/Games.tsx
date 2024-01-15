import useBggGames from "../../hooks/useBggGames";

const Games = () => {
  const { collection, loading, error } = useBggGames();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
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
              className="object-cover h-full w-full"
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
  );
};

export default Games;
