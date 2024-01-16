import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav";

export default function Root() {
  return (
    <div className="bg-slate-100 h-full min-h-screen">
      <div className="bg-slate-200 w-full p-4 drop-shadow-xl">
        <Nav />
      </div>
      <div className="w-full bg-slate-100 p-4">
        <Outlet />
      </div>
    </div>
  );
}
