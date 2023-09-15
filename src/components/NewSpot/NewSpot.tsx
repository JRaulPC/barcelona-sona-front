import { useEffect, useState } from "react";
import { Spot } from "../../types";
import Button from "../Button/Button";
import "./NewSpot.css";
import useSpotsApi from "../../hooks/useSpotsApi";
import { useAppDispatch } from "../../store";
import { addsSpotActionCreator } from "../../store/spots/spotsSlice";
import { useNavigate } from "react-router-dom";
import paths from "../../paths/paths";

const NewSpot = (): React.ReactElement => {
  const [disabled, setDisabled] = useState(true);
  const [newSpot, setNewSpot] = useState<Partial<Spot>>({
    name: "",
    imageUrl: "",
    spotUse: "",
    openingYear: 0,
    isVisited: false,
  });
  const dispatch = useAppDispatch();
  const { addSpot } = useSpotsApi();

  const changeNewSpot = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSpot((newSpot) => ({
      ...newSpot,
      [event.target.id]: event.target.value,
    }));
  };

  const { imageUrl, name, openingYear, spotUse } = newSpot;

  useEffect(() => {
    name !== "" && imageUrl !== "" && openingYear !== 0 && spotUse !== ""
      ? setDisabled(false)
      : setDisabled(true);
  }, [name, imageUrl, openingYear, spotUse]);

  const navigate = useNavigate();

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const spot: Spot = await addSpot(newSpot);

    dispatch(addsSpotActionCreator(spot));
    navigate(paths.spots);
  };

  return (
    <form className="form-spot" onSubmit={submitForm}>
      <div className="form-control">
        <label htmlFor="name">Espacio</label>
        <input
          type="text"
          id="name"
          maxLength={100}
          value={newSpot.name}
          onChange={changeNewSpot}
        />
      </div>
      <div className="form-control">
        <label htmlFor="imageUrl">URL Imagen</label>
        <input
          type="text"
          id="imageUrl"
          value={newSpot.imageUrl}
          onChange={changeNewSpot}
        />
      </div>
      <div className="form-control">
        <label htmlFor="openingYear">Año de creación</label>
        <input
          type="number"
          id="openingYear"
          min="1300"
          max="2023"
          maxLength={4}
          onChange={changeNewSpot}
        />
      </div>
      <div className="form-control">
        <label htmlFor="spotUse">Función del espacio</label>
        <input
          type="text"
          maxLength={50}
          id="spotUse"
          value={newSpot.spotUse}
          onChange={changeNewSpot}
        />
      </div>
      <div className="form-control__checkbox">
        <label htmlFor="isVisited">Visitado</label>
        <input className="form-control-check" type="checkbox" id="isVisited" />
      </div>
      <div className="form-spot__button">
        <Button
          className="outline-white outline-white--wider "
          disabled={disabled}
          type="submit"
        >
          Añadir espacio
        </Button>
      </div>
    </form>
  );
};

export default NewSpot;
