import React, { useState, useEffect } from "react";

interface GameDetails {
  id: string;
  name: string;
  description: string;
  yearPublished: string;
  minPlayers: string;
  maxPlayers: string;
  playingTime: string;
  minAge: string;
  categories: string[];
  mechanics: string[];
  thumbnail: string;
  designer: string[];
  publisher: string[];
}

const NewGames: React.FC = () => {
  const [gameDetails, setGameDetails] = useState<GameDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const filteredGames = (games: GameDetails[]) => {
    return games.filter((game) => {
      return (
        game.yearPublished.includes("2024") ||
        game.yearPublished.includes("2025") ||
        game.yearPublished.includes("2026")
      );
    });
  };
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          import.meta.env.REACT_APP_API_URL || "http://localhost:4000/api/games"
        );
        const games: GameDetails[] = await response.json();
        const filtered = filteredGames(games);
        setGameDetails(filtered);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-[1600px] mx-auto">
      <h2>Lattest Games Added to BGG</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {gameDetails.length === 0 ? (
          <p>
            No games returned, this likely means the server needs to wake up try
            again in 2 minutes.
          </p>
        ) : (
          gameDetails.map((game) => (
            <div
              className="flex flex-col shadow border-gray-700 bg-white my-4"
              key={game.id}
            >
              <div className="w-full h-64 min-h-64 max-h-64">
                <img
                  src={game.thumbnail}
                  alt={game.name}
                  className="object-cover object-top h-full w-full"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col h-full p-4 leading-normal">
                <h3 className="mb-2 text-2xl font-bold tracking-tight">
                  {game.name} ({game.yearPublished})
                </h3>
                <p>
                  <strong>Designers:</strong> {game.designer.join(", ")}
                </p>
                <p>
                  <strong>Publishers:</strong> {game.publisher.join(", ")}
                </p>
                <p>
                  <strong>Players:</strong> {game.minPlayers} -{" "}
                  {game.maxPlayers}
                </p>
                <p>
                  <strong>Playing Time:</strong> {game.playingTime} minutes
                </p>
                <p>
                  <strong>Min Age:</strong> {game.minAge}+
                </p>
                <p>
                  <strong>Categories:</strong> {game.categories.join(", ")}
                </p>
                <p>
                  <strong>Mechanics:</strong> {game.mechanics.join(", ")}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  <span
                    dangerouslySetInnerHTML={{ __html: game.description }}
                  ></span>
                </p>
                <div className="p-4 w-full flex">
                  <a
                    className="text-center w-full mt-4 p-4 border-2 border-slate-300 hover:bg-slate-200"
                    href={`https://boardgamegeek.com/boardgame/${game.id}`}
                    target="_blank"
                  >
                    View on BGG
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewGames;
