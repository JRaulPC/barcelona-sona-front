import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import EmptySpotsList from "../../components/EmptySpotsList/EmptySpotsList";
import SpotsList from "../../components/SpotsList/SpotsList";
import SpotsListExemple from "../../components/SpotsList/SpotsListExemple";
import { auth } from "../../firebase";
import useSpotsApi from "../../hooks/useSpotsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadSpotsActionCreator } from "../../store/spots/spotsSlice";
import { Spot } from "../../types";
import preloadSelectedImage from "../../utils/preloadSelectedImage";
import "./SpotsListPage.css";

const SpotsListPage = (): React.ReactElement => {
  const [user, isLoadingAuth] = useAuthState(auth);
  const dispatch = useAppDispatch();
  const { getSpots } = useSpotsApi();

  const spots: Spot[] = useAppSelector(({ spotsStore: { spots } }) => spots);
  const isLoadingUi = useAppSelector(({ uiStore: { isLoading } }) => isLoading);

  const hasSpots = spots.length > 0;

  useEffect(() => {
    (async () => {
      const userSpots = await getSpots();
      dispatch(loadSpotsActionCreator(userSpots!));

      hasSpots ? preloadSelectedImage(userSpots![0].imageUrl) : null;
    })();
  }, [dispatch, getSpots, hasSpots, user]);

  if (!user) {
    return (
      <main className="spots-page">
        <h2 className="spots-page__title">
          Este es un ejemplo de como se verian los espacios, registrate para
          añadir los tuyos y modificarlos.
        </h2>
        <SpotsListExemple />
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>Barcelona Sona - Espacios</title>
        <meta
          name="description"
          content="En esta página puedes consultar que espacios estan actualmente registrados"
        />
      </Helmet>

      {hasSpots
        ? !isLoadingAuth && (
            <main className="spots-page">
              <h2 className="spots-page__title">Espacios</h2>
              <SpotsList />
            </main>
          )
        : !isLoadingUi && !isLoadingAuth && <EmptySpotsList />}
    </>
  );
};

export default SpotsListPage;
