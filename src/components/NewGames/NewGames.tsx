import React, { useState, useEffect } from "react";

interface GameDetails {
  _id: string;
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
  const [filters, setFilters] = useState({
    minPlayers: "",
    maxPlayers: "",
    minAge: "",
    categories: "",
    mechanics: "",
    designers: "",
    publishers: "",
    playingTime: "", // Add playingTime filter
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const resetFilters = () => {
    setFilters({
      minPlayers: "",
      maxPlayers: "",
      minAge: "",
      categories: "",
      mechanics: "",
      designers: "",
      publishers: "",
      playingTime: "", // Reset playingTime filter
    });
    setCurrentPage(1); // Reset to first page on reset
  };

  const getUniqueOptions = (games: GameDetails[], key: keyof GameDetails) => {
    const options = games.map(game => game[key]);
    return Array.from(new Set(options.flat())).sort();
  };

  const filteredGames = (games: GameDetails[]) => {
    return games.filter((game) => {
      return (
        (filters.minPlayers === "" || game.minPlayers.includes(filters.minPlayers)) &&
        (filters.maxPlayers === "" || game.maxPlayers.includes(filters.maxPlayers)) &&
        (filters.minAge === "" || game.minAge.includes(filters.minAge)) &&
        (filters.categories === "" || game.categories.includes(filters.categories)) &&
        (filters.mechanics === "" || game.mechanics.includes(filters.mechanics)) &&
        (filters.designers === "" || game.designer.includes(filters.designers)) &&
        (filters.publishers === "" || game.publisher.includes(filters.publishers)) &&
        (filters.playingTime === "" || game.playingTime.includes(filters.playingTime)) // Add playingTime filter logic
      );
    });
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL
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

  const filteredGameDetails = filteredGames(gameDetails);
  const totalPages = Math.ceil(filteredGameDetails.length / itemsPerPage);
  const currentGames = filteredGameDetails.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const minPlayersOptions = getUniqueOptions(gameDetails, "minPlayers");
  const maxPlayersOptions = getUniqueOptions(gameDetails, "maxPlayers");
  const minAgeOptions = getUniqueOptions(gameDetails, "minAge");
  const categoriesOptions = getUniqueOptions(gameDetails, "categories");
  const mechanicsOptions = getUniqueOptions(gameDetails, "mechanics");
  const designersOptions = getUniqueOptions(gameDetails, "designer");
  const publishersOptions = getUniqueOptions(gameDetails, "publisher");
  const playingTimeOptions = getUniqueOptions(gameDetails, "playingTime"); // Add playingTime options

  return (
    <div className="max-w-[1600px] mx-auto">
      <h2 className="text-2xl">2025 Games</h2>
      <div className="mb-4 p-4 border rounded bg-gray-100">
        <h3 className="mb-2 text-xl font-bold">Filter Games</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <select
            name="minPlayers"
            value={filters.minPlayers}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Min Players</option>
            {minPlayersOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select
            name="maxPlayers"
            value={filters.maxPlayers}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Max Players</option>
            {maxPlayersOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select
            name="minAge"
            value={filters.minAge}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Min Age</option>
            {minAgeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select
            name="categories"
            value={filters.categories}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Categories</option>
            {categoriesOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select
            name="mechanics"
            value={filters.mechanics}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Mechanics</option>
            {mechanicsOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select
            name="designers"
            value={filters.designers}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Designers</option>
            {designersOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select
            name="publishers"
            value={filters.publishers}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Publishers</option>
            {publishersOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select
            name="playingTime"
            value={filters.playingTime}
            onChange={handleFilterChange}
            className="p-2 border rounded"
          >
            <option value="">Playing Time</option>
            {playingTimeOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <button
          onClick={resetFilters}
          className="mt-4 p-2 bg-red-500 text-white rounded w-full sm:w-auto"
        >
          Reset Filters
        </button>
      </div>
      <div>
        {currentGames.length === 0 ? (
          <p>
            No games returned, this likely means the server needs to wake up try
            again in 2 minutes.
          </p>
        ) : (
          currentGames.map((game) => (
            <div
              className="flex flex-col md:flex-row shadow border-gray-700 bg-white my-4"
              key={game._id}
            >
              <div className="w-full md:w-[200px] flex-shrink-0">
                <img
                  src={game.thumbnail}
                  alt={game.name}
                  className="w-full"
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
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 mx-2 border rounded"
        >
          Previous
        </button>
        <span className="p-2">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 mx-2 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewGames;
