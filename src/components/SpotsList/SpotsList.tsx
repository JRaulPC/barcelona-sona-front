import "./SpotsList.css";
import { useAppSelector } from "../../store";
import SpotCard from "../SpotCard/SpotCard";

const SpotsList = (): React.ReactElement => {
  const spots = useAppSelector(({ spotsStore: { spots } }) => spots);

  return (
    <ul className="spots-list">
      {spots.map((spot) => (
        <li key={spot.id} className="spots-list__spot">
          <SpotCard spot={spot} />
        </li>
      ))}
    </ul>
  );
};

export default SpotsList;
