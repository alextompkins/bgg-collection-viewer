import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import { BggGamesProvider } from "../context/BggGamesContext";

export default function Root() {
  return (
    <div className="bg-slate-600 h-full min-h-screen text-white">
      <div className="bg-slate-700 w-full p-4 shadow-inner">
        <Nav />
      </div>
      <div className="w-full bg-slate-600 p-4">
        <Outlet />
      </div>
    </div>
  );
}
