import { Filters } from '../../components/Filters/Filters';
import { GamesList } from '../../components/GamesList/GamesList';
import { BggGamesProvider } from '../../context/BggGamesContext';

export const Games = () => {
  return (
    <BggGamesProvider>
      <Filters />
      <GamesList />
    </BggGamesProvider>
  );
};
