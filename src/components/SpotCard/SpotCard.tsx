import { Spot } from "../../types";
import "./SpotCard.css";
export interface SpotCardProps {
  spot: Partial<Spot>;
}

const SpotCard = ({
  spot: { imageUrl, name, openingYear, spotUse, id },
}: SpotCardProps): React.ReactElement => {
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
        <h2 className="spot-card__heading">{name}</h2>
        <ul className="spot-card__properties">
          <li>{spotUse}</li>
          <li>{openingYear}</li>
        </ul>
        <div className="spot-card__checkbox">
          <label htmlFor={`visited ${id}`}>Lo has visitado?</label>
          <input type="checkbox" name="visited" id={`visited ${id}`} />
        </div>
      </div>
    </article>
  );
};

export default SpotCard;
