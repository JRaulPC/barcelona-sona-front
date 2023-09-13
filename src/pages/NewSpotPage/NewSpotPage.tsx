/* eslint-disable react/no-unescaped-entities */
import { lazy } from "react";
import "./NewSpotPage.css";

export const LazyNewSpotPage = lazy(() => import("../NewSpotPage/NewSpotPage"));

const NewSpotPage = () => {
  return (
    <section className="new-spot-page">
      <h2 className="new-spot-page__title">Añade un nuevo espacio</h2>
    </section>
  );
};

export default NewSpotPage;
