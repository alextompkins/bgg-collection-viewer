import { Outlet } from 'react-router-dom';

import BggLogo from '../bgglogo.png';
import Nav from '../components/Nav/Nav';

export default function Root() {
  return (
    <div className="bg-slate-100 h-full min-h-screen">
      <div className="bg-slate-200 w-full p-4 drop-shadow-xl">
        <Nav />
      </div>
      <div className="w-full bg-slate-100 p-4">
        <Outlet />
      </div>
      <div className="w-full bg-slate-100 p-4">
        <img src={BggLogo} alt="Board Game Geek Logo" className="w-64 mx-auto" />
      </div>
    </div>
  );
}
