import { NavLink } from "react-router-dom";
import "./NavigationBar.css";

const NavigationBar = (): React.ReactElement => {
  return (
    <nav className="navigation-bar">
      <ul className="navigation-bar__elements">
        <li>
          <NavLink to="/espacios" className="navigation-bar__spots">
            Espacios
          </NavLink>
        </li>
        <li>
          <NavLink to="/añadir" className="navigation-bar__add">
            Añadir
          </NavLink>
        </li>
        <li>salir</li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
