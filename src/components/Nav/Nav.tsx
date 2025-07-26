import { Link } from 'react-router-dom';

export const Nav = () => (
  <div className="flex flex-col md:flex-row gap-4">
    <h1 className="text-4xl leading-[inherit]">BGG Collection Viewer</h1>
    <ul className=" flex">
      <li>
        <Link to="/" className="flex p-4 hover:bg-slate-300 rounded-xl">
          Home
        </Link>
      </li>
      <li>
        <Link to="/games" className="flex p-4 hover:bg-slate-300 rounded-xl">
          Games
        </Link>
      </li>
      <li>
        <Link to="/new-games" className="flex p-4 hover:bg-slate-300 rounded-xl">
          2025 Games
        </Link>
      </li>
    </ul>
  </div>
);
