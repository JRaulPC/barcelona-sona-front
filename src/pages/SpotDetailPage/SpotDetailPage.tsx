import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase";
import useSpotsApi from "../../hooks/useSpotsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteSpotActionCreator,
  loadSelectedSpotActionCreator,
} from "../../store/spots/spotsSlice";
import Button from "../../components/Button/Button";
import "./SpotDetailPage.css";
import paths from "../../paths/paths";

const SpotDetailPage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const { getSpotById, deleteSpot } = useSpotsApi();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const navigate = useNavigate();

  const deleteItem = async () => {
    await deleteSpot(id!);
    dispatch(deleteSpotActionCreator(id!));

    navigate(paths.spots);
  };

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

  const { description, imageUrl, name, openingYear, spotUse } = spot;

  return (
    <main className="spot-detail-page">
      <h2 className="spot-detail-page__title">{name}</h2>
      <img
        src={imageUrl}
        alt={name}
        width="288"
        height="312"
        className="spot-image "
      />
      <ul className="spot-detail-page__properties">
        <li>{spotUse}</li>
        <li>{openingYear}</li>
      </ul>
      <hr className="separator"></hr>
      <div className="spot-detail-page__description">
        <p className="spot-detail-page__description-text">{description}</p>
      </div>
      <div className="spot-checkbox">
        <label htmlFor={`visited${name?.replace(/\s/g, "")}`}>
          Lo has visitado?
        </label>
        <input type="checkbox" id={`visited${name?.replace(/\s/g, "")}`} />
      </div>
      <Button
        actionOnClick={deleteItem}
        className="button-danger  button-danger--margin-top"
      >
        Eliminar
      </Button>
    </main>
  );
};

export default SpotDetailPage;
