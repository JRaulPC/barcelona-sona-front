import { Link } from "react-router-dom";
import paths from "../../paths/paths";
import "./Page404.css";

const Page404 = (): React.ReactElement => {
  return (
    <main className="page-404">
      <div className="page-404__info">
        <img
          className="page-404__img"
          src="/img/404-background.svg"
          alt="Representacion abstracta del efecto doppler"
        />
        <h2 className="page-404__title">Error 404</h2>
        <span className="page-404__text">
          No hemos encontrado lo que buscabas
        </span>
      </div>
      <Link className="button-primary" to={paths.homePage}>
        Volver al inicio
      </Link>
    </main>
  );
};

export default Page404;
