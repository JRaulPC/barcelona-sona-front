import { useEffect, useState } from "react";
import { Spot } from "../../types";
import Button from "../Button/Button";
import useSpotsApi from "../../hooks/useSpotsApi";
import { useAppDispatch } from "../../store";
import { addsSpotActionCreator } from "../../store/spots/spotsSlice";
import { useNavigate } from "react-router-dom";
import paths from "../../paths/paths";
import "./NewSpotForm.css";

const NewSpotForm = (): React.ReactElement => {
  const [disabled, setDisabled] = useState(false);

  const [newSpot, setNewSpot] = useState<Partial<Spot>>({
    name: "",
    imageUrl: "",
    spotUse: "",
    openingYear: 0,
    isVisited: false,
    description: "",
  });

  const dispatch = useAppDispatch();
  const { addSpot } = useSpotsApi();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewSpot((newSpot) => ({
      ...newSpot,
      [event.target.id]: event.target.value,
    }));
  };

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSpot((newSpot) => ({
      ...newSpot,
      [event.target.id]: event.target.checked,
    }));
  };

  useEffect(() => {
    const newSpotCheck = { ...newSpot };

    delete newSpotCheck.isVisited;

    setDisabled(
      Object.values(newSpotCheck).every((value) => {
        return Boolean(value);
      }),
    );
  }, [newSpot]);

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
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="imageUrl">URL Imagen</label>
        <input
          type="text"
          id="imageUrl"
          value={newSpot.imageUrl}
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="spotUse">Función del espacio</label>
        <input
          type="text"
          maxLength={50}
          id="spotUse"
          value={newSpot.spotUse}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          cols={10}
          value={newSpot.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-control-checkbox form-control-textarea">
        <label htmlFor="isVisited">Visitado</label>
        <input
          className="checked"
          type="checkbox"
          id="isVisited"
          onChange={handleCheckedChange}
        />
      </div>
      <div className="form-spot__button">
        <Button
          className="outline-white outline-white--wider"
          disabled={!disabled}
          type="submit"
        >
          Añadir espacio
        </Button>
      </div>
    </form>
  );
};

export default NewSpotForm;
