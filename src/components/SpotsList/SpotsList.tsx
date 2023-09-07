import "./SpotsList.css";
import { useAppSelector } from "../../store";

const SpotsList = (): React.ReactElement => {
  const spots = useAppSelector(({ spotsStore: { spots } }) => spots);

  return (
    <ul className="spots-list">
      {spots.map((spot) => (
        <li key={spot.id} className="spots-list__spot">
          <h2>{spot.name}</h2>
        </li>
      ))}
    </ul>
  );
};

export default SpotsList;
