import { Spot } from "../../types";
import "./SpotCard.css";
export interface SpotCardProops {
  spot: Partial<Spot>;
}

const SpotCard = ({
  spot: { imageUrl, name, opening, spotUse },
}: SpotCardProops): React.ReactElement => {
  return (
    <article className="spot-card">
      <img
        className="spot-card__image"
        src={imageUrl}
        alt={`El espacio ${name}`}
        width="288"
        height="312"
        loading="lazy"
      />
      <div className="spot-card__info">
        <h1 className="spot-card__heading">{name}</h1>
        <ul className="spot-card__properties">
          <li>{spotUse}</li>
          <li>{opening}</li>
        </ul>
        <div className="spot-card__checkbox">
          <label htmlFor="visited">Lo has visitado?</label>
          <input type="checkbox" name="visited" id="" />
        </div>
      </div>
    </article>
  );
};

export default SpotCard;
