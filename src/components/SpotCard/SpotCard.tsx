import { Link } from "react-router-dom";
import useSpotsApi from "../../hooks/useSpotsApi";
import { useAppDispatch } from "../../store";
import { deleteSpotActionCreator } from "../../store/spots/spotsSlice";
import { Spot } from "../../types";
import Button from "../Button/Button";
import "./SpotCard.css";

interface SpotCardProps {
  spot: Partial<Spot>;
  listPosition: number;
}

const SpotCard = ({
  spot: { imageUrl, name, openingYear, spotUse, id },
  listPosition,
}: SpotCardProps): React.ReactElement => {
  const { deleteSpot } = useSpotsApi();
  const dispatch = useAppDispatch();

  const deleteItem = async () => {
    await deleteSpot(id!);
    dispatch(deleteSpotActionCreator(id!));
  };

  return (
    <article className="spot-card">
      <img
        className="spot-card__image"
        src={imageUrl}
        alt={`El espacio ${name}`}
        width="288"
        height="312"
        {...(listPosition > 3 ? { loading: "lazy" } : {})}
      />
      <div className="spot-card__info">
        <h2 className="spot-card__heading">{name}</h2>
        <ul className="spot-card__properties">
          <li>{spotUse}</li>
          <li>{openingYear}</li>
        </ul>
        <div className="spot-card__checkbox">
          <label htmlFor={`visited${name?.replace(/\s/g, "")}`}>
            Lo has visitado?
          </label>
          <input type="checkbox" id={`visited${name?.replace(/\s/g, "")}`} />
        </div>
        <div>
          <Button className="outlined-red" actionOnClick={deleteItem}>
            Eliminar
          </Button>
          <Link to={`/detalle/${id}`}>Ver más</Link>
        </div>
      </div>
    </article>
  );
};

export default SpotCard;
