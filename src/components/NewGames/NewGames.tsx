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
}

const NewGames: React.FC = () => {
  const [gameDetails, setGameDetails] = useState<GameDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          import.meta.env.REACT_APP_API_URL || "http://localhost:4000/api/games"
        );
        const games: GameDetails[] = await response.json();
        setGameDetails(games);
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
    <>
      <h2>Lattest Games Added to BGG</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {gameDetails.length === 0 ? (
          <p>No games found.</p>
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
                  <strong>Description:</strong> {game.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default NewGames;
