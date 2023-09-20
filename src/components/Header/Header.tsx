import { Link } from "react-router-dom";
import "./Header.css";
import paths from "../../paths/paths";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <Link to={paths.spots}>
        <h1 className="header__title">Barcelona SONA</h1>
      </Link>
      <img
        className="header__logo"
        src="/img/app-logo.svg"
        alt="Barcelona sona logo"
        width="62"
        height="57"
      />
    </header>
  );
};

export default Header;
