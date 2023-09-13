import { lazy, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import SpotsList from "../../components/SpotsList/SpotsList";
import { auth } from "../../firebase";
import useSpotsApi from "../../hooks/useSpotsApi";
import { useAppDispatch } from "../../store";
import { loadSpotsActionCreator } from "../../store/spots/spotsSlice";
import "./SpotsListPage.css";

export const LazySpotsListPage = lazy(
  () => import("../../pages/SpotsListPage/SpotsListPage"),
);

const SpotsListPage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const { getSpots } = useSpotsApi();

  useEffect(() => {
    if (user) {
      (async () => {
        const spots = await getSpots();
        dispatch(loadSpotsActionCreator(spots!));
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
