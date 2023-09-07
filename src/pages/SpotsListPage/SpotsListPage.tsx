import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import "./SpotsListPage.css";
import { loadSpotsActionCreator } from "../../store/spots/spotsSlice";
import { spotsMock } from "../../mocks/mocks";
import SpotsList from "../../components/SpotsList/SpotsList";

const SpotsListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadSpotsActionCreator(spotsMock));
  }, [dispatch]);

  return (
    <section className="spots-page">
      <h2 className="spots-page__heading">Espacios</h2>
      <SpotsList />
    </section>
  );
};

export default SpotsListPage;
