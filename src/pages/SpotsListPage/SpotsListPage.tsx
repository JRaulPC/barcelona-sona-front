import { useEffect } from "react";
import { useAppDispatch } from "../../store";
import "./SpotsListPage.css";
import { loadSpotsActionCreator } from "../../store/spots/spotsSlice";
import SpotsList from "../../components/SpotsList/SpotsList";
import useSpotsApi from "../../hooks/useSpotsApi";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const SpotsListPage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const { getSpots } = useSpotsApi();

  useEffect(() => {
    if (user) {
      (async () => {
        const spots = await getSpots();
        dispatch(loadSpotsActionCreator(spots));
      })();
    }
  }, [dispatch, getSpots, user]);

  return (
    <main className="spots-page">
      <h2 className="spots-page__title">Espacios</h2>
      <SpotsList />
    </main>
  );
};

export default SpotsListPage;
