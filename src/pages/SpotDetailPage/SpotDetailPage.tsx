import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase";
import useSpotsApi from "../../hooks/useSpotsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadSelectedSpotActionCreator } from "../../store/spots/spotsSlice";

const SpotDetailPage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const { getSpotById } = useSpotsApi();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (user) {
      (async () => {
        const selectedSpot = await getSpotById(id!);

        dispatch(loadSelectedSpotActionCreator(selectedSpot!));
      })();
    }
  }, [dispatch, getSpotById, id, user]);

  const spot = useAppSelector(
    ({ spotsStore: { selectedSpot } }) => selectedSpot!,
  );

  return (
    <main className="spot-detail-page">
      <h2>{spot.name}</h2>
    </main>
  );
};

export default SpotDetailPage;
