import Button from "../Button/Button";
import "./NewSpot.css";

const NewSpot = (): React.ReactElement => {
  return (
    <form className="form-spot">
      <div className="form-control">
        <label htmlFor="spot">Espacio</label>
        <input type="text" id="spot" maxLength={100} />
      </div>
      <div className="form-control">
        <label htmlFor="image">URL Imagen</label>
        <input type="text" id="image" />
      </div>
      <div className="form-control">
        <label htmlFor="creation">Año de creación</label>
        <input type="number" id="creation" min="1300" max="2023" />
      </div>
      <div className="form-control">
        <label htmlFor="spot-function">Función del espacio</label>
        <input type="text" id="spot-function" />
      </div>
      <div className="form-control__checkbox">
        <label htmlFor="visited">Visitado</label>
        <input className="form-control-check" type="checkbox" id="visited" />
      </div>
      <div className="form-spot__button">
        <Button
          actionOnClick={() => {}}
          className="outline-white outline-white--wider "
        >
          Añadir espacio
        </Button>
      </div>
    </form>
  );
};

export default NewSpot;
