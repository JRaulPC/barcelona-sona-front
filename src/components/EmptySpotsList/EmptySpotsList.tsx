import { Link } from "react-router-dom";
import paths from "../../paths/paths";
import "./EmptySpotsList.css";

const EmptySpotsList = (): React.ReactElement => {
  return (
    <main className="empty-spots-list">
      <div></div>
      <h2 className="empty-spots-list__title">
        Aun no tienes ningún espacio subido
      </h2>
      <img
        className="empty-spots-list__image"
        src="/img/404-background.svg"
        alt="Representacion abstracta del efecto doppler"
        width="140"
        height="140"
      />
      <Link
        className="button-primary button-primary-smaller"
        to={paths.createSpot}
      >
        Añadir espacio
      </Link>
      ;
    </main>
  );
};

export default EmptySpotsList;
