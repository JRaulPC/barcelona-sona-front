import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import paths from "../../paths/paths";
import "./Page404.css";
import { lazy } from "react";

export const LazyPage404 = lazy(() => import("./Page404"));

const Page404 = (): React.ReactElement => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate(paths.homePage);
  };

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
      <Button className="go-home" actionOnClick={goHome}>
        Volver al inicio
      </Button>
    </main>
  );
};

export default Page404;
