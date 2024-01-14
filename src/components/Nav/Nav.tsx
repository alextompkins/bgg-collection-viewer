import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <h1 className="text-4xl">James BGG Stats</h1>
      <ul className="pt-4">
        <li>
          <Link to="/" className="flex p-4 hover:bg-slate-800 rounded-xl">
            Home
          </Link>
        </li>
        <li>
          <Link to="/games" className="flex p-4 hover:bg-slate-800 rounded-xl">
            Games
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Nav;
