import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../firebase";
import paths from "../../paths/paths";
import Button from "../Button/Button";
import "./NavigationBar.css";

const NavigationBar = (): React.ReactElement => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="navigation-bar">
      <ul className="navigation-bar__links">
        <li className="navigation-bar__element">
          <Button
            type="button"
            actionOnClick={logout}
            className="navigation-bar__exit-button"
          >
            <>
              <img
                src="/img/icon-exit.svg"
                alt="Botón para cerrar sesión de usuario"
                width="24"
                height="24"
                className="navigation-bar__exit-logo"
              />
              Salir
            </>
          </Button>
        </li>
        <li className="navigation-bar__element">
          <NavLink to={paths.createSpot} className="navigation-bar__link">
            <img
              src="/img/icon-add.svg"
              alt="Link para acceder a la página añadir un espacio"
              width="24"
              height="24"
              className="navigation-bar__logo"
            />
          </NavLink>
          Crear
        </li>
        <li className="navigation-bar__element">
          <NavLink to={paths.spots} className="navigation-bar__link">
            <img
              src="/img/icon-list.svg"
              alt="Link para acceder a la página de listado"
              width="24"
              height="24"
              className="navigation-bar__spots-logo"
            />
          </NavLink>
          Espacios
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
