import { NavLink } from "react-router-dom";
import "./NavigationBar.css";
import Button from "../Button/Button";

const NavigationBar = (): React.ReactElement => {
  return (
    <nav className="navigation-bar">
      <ul className="navigation-bar__elements">
        <li className="navigation-bar__element">
          <NavLink to="/espacios" className="navigation-bar__link">
            <img
              src="/img/icon-list.png"
              alt="Link para acceder a la página de listado"
              width="24"
              height="24"
              className="navigation-bar__spots-logo"
            />
          </NavLink>
          Espacios
        </li>
        <li className="navigation-bar__element">
          <NavLink to="/añadir" className="navigation-bar__link">
            <img
              src="/img/icon-add.png"
              alt="Link para acceder a la página añadir un espacio"
              width="24"
              height="24"
              className="navigation-bar__-logo"
            />
          </NavLink>
          Añadir
        </li>
        <li className="navigation-bar__element">
          <Button actionOnClick={() => {}} className="exit-button">
            <>
              <img
                src="/img/icon-exit.png"
                alt="Botón para cerrar sesión de usuario"
                width="24"
                height="24"
                className="navigation-bar__exit-logo"
              />
              <span>Salir</span>
            </>
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
