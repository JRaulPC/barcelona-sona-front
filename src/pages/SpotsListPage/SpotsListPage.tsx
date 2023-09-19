import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Helmet } from "react-helmet";
import SpotsList from "../../components/SpotsList/SpotsList";
import { auth } from "../../firebase";
import useSpotsApi from "../../hooks/useSpotsApi";
import { useAppDispatch } from "../../store";
import { loadSpotsActionCreator } from "../../store/spots/spotsSlice";
import "./SpotsListPage.css";

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
    <>
      <Helmet>
        <title>Listado de espacios</title>
        <meta
          name="description"
          content="En esta página puedes consultar que espacios estan actualmente registrados"
        />
      </Helmet>
      <main className="spots-page">
        <h2 className="spots-page__title">Espacios</h2>
        <SpotsList />
      </main>
    </>
  );
};

export default SpotsListPage;
