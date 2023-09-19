import { useState } from "react";
import { Link } from "react-router-dom";
import useSpotsApi from "../../hooks/useSpotsApi";
import { useAppDispatch } from "../../store";
import {
  deleteSpotActionCreator,
  toggleIsVisitedActionCreator,
} from "../../store/spots/spotsSlice";
import { Spot } from "../../types";
import Button from "../Button/Button";
import "./SpotCard.css";

interface SpotCardProps {
  spot: Partial<Spot>;
  listPosition: number;
}

const SpotCard = ({
  spot: { imageUrl, name, openingYear, spotUse, id, isVisited },
  spot,
  listPosition,
}: SpotCardProps): React.ReactElement => {
  const [isChecked, setIsChecked] = useState(isVisited);
  const { deleteSpot, toogleIsVisited } = useSpotsApi();
  const dispatch = useAppDispatch();

  const deleteItem = async () => {
    await deleteSpot(id!);
    dispatch(deleteSpotActionCreator(id!));
  };

  const handeOnchange = async () => {
    const updatedSpot = await toogleIsVisited(id!, spot as Spot);
    dispatch(toggleIsVisitedActionCreator(updatedSpot as Spot));
    setIsChecked(!isChecked);
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
        <div className="spot-checkbox">
          <label htmlFor={`visited${name?.replace(/\s/g, "")}`}>
            Lo has visitado?
          </label>
          <input
            type="checkbox"
            id={`visited${name?.replace(/\s/g, "")}`}
            onChange={handeOnchange}
            checked={isChecked}
          />
        </div>
        <div className="spot-card__butons">
          <Button className="button-primary--danger" actionOnClick={deleteItem}>
            Eliminar
          </Button>
          <Link className="spot-card__link" to={`/detalle/${id}`}>
            Ver más
          </Link>
        </div>
      </div>
    </article>
  );
};

export default SpotCard;
