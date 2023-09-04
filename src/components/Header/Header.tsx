import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <div className="header__elements">
        <div className="header-content">
          <h1 className="header__title">Barcelona SONA</h1>
          <img
            className="main-header__logo"
            src="/img/app-logo.png"
            alt="Robots webpage logo"
            width="62"
            height="62"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
