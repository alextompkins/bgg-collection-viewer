import type { Game } from '../../models/game.ts';

export const GameTile = ({
  bggId,
  imageUrl,
  name,
  yearPublished,
  minPlayers,
  maxPlayers,
  playingTime,
  numPlays,
  comment,
}: Game) => {
  return (
    <div className="flex flex-col shadow border-gray-700 bg-white my-4">
      <div className="w-full h-64 min-h-64 max-h-64">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover object-top h-full w-full"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col h-full p-4 leading-normal">
        <h2 className="mb-2 text-2xl font-bold tracking-tight">
          {name} ({yearPublished})
        </h2>
        <p>
          Players: {minPlayers} - {maxPlayers}
        </p>
        <p>Avg. Playtime: {playingTime} minutes</p>
        <p>Number of Plays: {numPlays}</p>
        <p>{comment}</p>
      </div>
      <div className="p-4 w-full flex">
        <a
          className="text-center w-full mt-4 p-4 border-2 border-slate-300 hover:bg-slate-200"
          href={`https://boardgamegeek.com/boardgame/${bggId}`}
          target="_blank"
          rel="noreferrer"
        >
          View on BGG
        </a>
      </div>
    </div>
  );
};
