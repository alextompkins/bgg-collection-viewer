import { TGame } from "../../types/types";

const Game: React.FC<TGame> = ({
  bggId,
  thumbnail,
  name,
  yearpublished,
  minplayers,
  maxplayers,
  minplaytime,
  maxplaytime,
  playingtime,
  numplays,
}) => {
  return (
    <div className="flex flex-col rounded-lg shadow border-gray-700 bg-gray-800 my-4">
      <div className="w-full h-64 min-h-64 max-h-64">
        <img
          src={thumbnail}
          alt={name}
          className="object-cover object-top h-full w-full"
        />
      </div>

      <div className="flex flex-col h-full p-4 leading-normal">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">{name}</h2>
        <p>Year Published: {yearpublished}</p>
        <p>Min Players: {minplayers}</p>
        <p>Max Players: {maxplayers}</p>
        <p>Min Playtime: {minplaytime} minutes</p>
        <p>Max Playtime: {maxplaytime} minutes</p>
        <p>Playing Time: {playingtime} minutes</p>
        <p>Number of Plays: {numplays}</p>
      </div>
      <a
        className="w-full mt-4 p-4 bg-blue-900 hover:bg-slate-900 rounded-lg"
        href={`https://boardgamegeek.com/boardgame/${bggId}`}
        target="_blank"
      >
        View on BGG
      </a>
    </div>
  );
};

export default Game;
