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
    <div className="grid grid-cols-3 gap-4">
      {collection?.map((game) => (
        <div
          className="flex flex-col items-center rounded-lg shadow md:flex-row md:max-w-xl border-gray-700 bg-gray-800 hover:bg-gray-700 my-4"
          key={game.bggId}
        >
          <img
            src={game.thumbnail}
            alt={game.name}
            className="object-cover w-48 rounded-t-lg h-full"
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
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
        </div>
      ))}
    </div>
  );
};

export default Games;
