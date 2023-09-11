import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import "./SpotsListPage.css";
import { loadSpotsActionCreator } from "../../store/spots/spotsSlice";
import SpotsList from "../../components/SpotsList/SpotsList";
import useSpotsApi from "../../hooks/useSpotsApi";

const SpotsListPage = (): React.ReactElement => {
  const dispatch = useAppDispatch();
  const { getSpots } = useSpotsApi();

  useEffect(() => {
    (async () => {
      const spots = await getSpots();
      dispatch(loadSpotsActionCreator(spots));
    })();
  }, [dispatch, getSpots]);

  return (
    <main className="spots-page">
      <h2 className="spots-page__title">Espacios</h2>
      <SpotsList />
    </main>
  );
};

export default SpotsListPage;
