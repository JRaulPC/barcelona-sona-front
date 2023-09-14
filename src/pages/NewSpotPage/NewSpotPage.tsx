/* eslint-disable react/no-unescaped-entities */
import { lazy } from "react";
import "./NewSpotPage.css";
import NewSpot from "../../components/NewSpot/NewSpot";

export const LazyNewSpotPage = lazy(() => import("../NewSpotPage/NewSpotPage"));

const NewSpotPage = () => {
  return (
    <section className="new-spot-page">
      <h2 className="new-spot-page__title">Añade un nuevo espacio</h2>
      <NewSpot />
    </section>
  );
};

export default NewSpotPage;
