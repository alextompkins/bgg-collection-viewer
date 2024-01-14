import { Outlet } from "react-router-dom";
import Nav from "../components/Nav/Nav";

export default function Root() {
  return (
    <div className="bg-slate-600 h-full min-h-screen text-white">
      <div className="fixed h-full bg-slate-700 w-64 p-4 shadow-inner">
        <Nav />
      </div>
      <div className="ml-64 p-4">
        <Outlet />
      </div>
    </div>
  );
}
