import { useBggGamesContext } from "../../context/BggGamesContext";
import { TGame } from "../../types/types";
import Game from "../Game/Game";

const GamesList = () => {
  const { collection, loading, error } = useBggGamesContext();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {collection?.map((game: TGame) => (
          <Game {...game} key={game.bggId} />
      ))}
    </div>
  );
};

export default GamesList;
