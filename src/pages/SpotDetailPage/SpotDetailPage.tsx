import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../firebase";
import useSpotsApi from "../../hooks/useSpotsApi";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteSpotActionCreator,
  loadSelectedSpotActionCreator,
  toggleIsVisitedActionCreator,
} from "../../store/spots/spotsSlice";
import Button from "../../components/Button/Button";
import "./SpotDetailPage.css";
import paths from "../../paths/paths";
import { Spot } from "../../types";

const SpotDetailPage = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const { getSpotById, deleteSpot, toogleIsVisited } = useSpotsApi();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const spot = useAppSelector(
    ({ spotsStore: { selectedSpot } }) => selectedSpot!,
  );

  useEffect(() => {
    if (user) {
      (async () => {
        const selectedSpot = await getSpotById(id!);

        dispatch(loadSelectedSpotActionCreator(selectedSpot!));
      })();
    }
  }, [dispatch, getSpotById, id, user]);

  const { description, imageUrl, name, openingYear, spotUse, isVisited } = spot;

  const [isChecked, setIsChecked] = useState(isVisited);

  const deleteItem = async () => {
    await deleteSpot(id!);
    dispatch(deleteSpotActionCreator(id!));

    navigate(paths.spots);
  };

  const handeOnchange = async () => {
    const updatedSpot = await toogleIsVisited(id!, spot as Spot);
    dispatch(toggleIsVisitedActionCreator(updatedSpot as Spot));
    setIsChecked(!isChecked);
  };

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
        <input
          type="checkbox"
          id={`visited${name?.replace(/\s/g, "")}`}
          onChange={handeOnchange}
          checked={isChecked}
        />
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
