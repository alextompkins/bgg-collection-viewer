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
          className="flex flex-col rounded-lg shadow border-gray-700 bg-gray-800 hover:bg-gray-700 my-4"
          key={game.bggId}
        >
          <div className="flex h-64">
            <img
              src={game.thumbnail}
              alt={game.name}
              className="object-cover w-full"
            />
          </div>

          <div className="p-4 leading-normal">
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
