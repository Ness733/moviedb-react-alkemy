import { Link } from "react-router-dom";
import Buscador from "./Buscador";

import "../css/bootstrap.min.css";

function Header(props) {
  return (
    <header>
      <nav
        className="navbar bg-dark border-bottom border-body navbar-expand-lg"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <ul className="navbar-nav">
            <Link className="navbar-brand" to="/">
              AnotherMovieDB
            </Link>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list">
                List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>
            <li>
              {props.favorites.length > 0 && (
                <span className="favCounter">{props.favorites.length}</span>
              )}
            </li>
          </ul>
          <Buscador />
        </div>
      </nav>
    </header>
  );
}

export default Header;
