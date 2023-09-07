import { NavLink, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import Button from "../Button/Button";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import React from "react";

export const LazyNavigationBar = React.lazy(
  () => import("../NavigationBar/NavigationBar"),
);

const NavigationBar = (): React.ReactElement => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/home");
  };

  return (
    <nav className="navigation-bar">
      <ul className="navigation-bar__links">
        <li className="navigation-bar__element">
          <Button
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
          <NavLink to="/añadir" className="navigation-bar__link">
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
          <NavLink to="/espacios" className="navigation-bar__link">
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
