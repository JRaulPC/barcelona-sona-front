import "./Header.css";

const Header = (): React.ReactElement => {
  return (
    <header className="header">
      <h1 className="header__title">Barcelona SONA</h1>
      <img
        className="header__logo"
        src="/img/app-logo.png"
        alt="Barcelona sona logo"
        width="62"
        height="62"
      />
    </header>
  );
};

export default Header;
