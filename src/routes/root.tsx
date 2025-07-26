import { Outlet } from 'react-router-dom';

import PoweredByBgg from '../assets/powered-by-bgg.png';
import { Nav } from '../components/Nav/Nav';

export const Root = () => (
  <div className="bg-slate-100 h-full min-h-screen">
    <div className="bg-slate-200 w-full p-4 drop-shadow-xl">
      <Nav />
    </div>
    <div className="w-full bg-slate-100 p-4">
      <Outlet />
    </div>
    <div className="w-full bg-slate-100 p-4">
      <img src={PoweredByBgg} alt="Board Game Geek Logo" className="w-64 mx-auto" />
    </div>
  </div>
);
