import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import paths from "../../paths/paths";
import Button from "../Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Header = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <header className="header">
      <div className="header__page-links ">
        <Link to={paths.spots}>
          <h1 className="header__title">Barcelona SONA</h1>
        </Link>
        <ul className="header__links">
          <li className="header__element">
            <NavLink to={paths.createSpot} className="header__link">
              Crear
            </NavLink>
          </li>
          <li className="header__element">
            <NavLink to={paths.spots} className="header__link">
              Espacios
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="header__page-misc">
        <span className="user-name">{user?.email}</span>
        {user ? (
          <Button
            type="button"
            actionOnClick={logout}
            className="header__exit-button"
          >
            <>
              <img
                src="/img/icon-exit.svg"
                alt="Botón para cerrar sesión de usuario"
                width="24"
                height="24"
                className="header__exit-logo"
              />
              Salir
            </>
          </Button>
        ) : (
          <Link className="homepage__link-to-register " to={paths.register}>
            ¿No tienes cuenta? Registrate
          </Link>
        )}

        <img
          className="header__logo"
          src="/img/app-logo.svg"
          alt="Barcelona sona logo"
          width="62"
          height="57"
        />
      </div>
    </header>
  );
};

export default Header;
