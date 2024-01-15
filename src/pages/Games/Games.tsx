import Filters from "../../components/Filters/Filters";
import GamesList from "../../components/GamesList/GamesList";
import { BggGamesProvider } from "../../context/BggGamesContext";

const Games = () => {
  return (
    <BggGamesProvider>
      <Filters />
      <GamesList />
    </BggGamesProvider>
  );
};

export default Games;
