import "./SpotsList.css";
import { useAppSelector } from "../../store";
import SpotCard from "../SpotCard/SpotCard";
import React from "react";

export const LazySpotsListPage = React.lazy(
  () => import("../../pages/SpotsListPage/SpotsListPage"),
);

const SpotsList = (): React.ReactElement => {
  const spots = useAppSelector(({ spotsStore: { spots } }) => spots);

  return (
    <ul className="spots-list">
      {spots.map((spot, listPosition) => (
        <li key={spot.id} className="spots-list__spot">
          <SpotCard spot={spot} listPosition={listPosition} />
        </li>
      ))}
    </ul>
  );
};

export default SpotsList;
