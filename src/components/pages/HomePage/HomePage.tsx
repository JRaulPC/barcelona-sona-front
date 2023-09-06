import "./HomePage.css";
import Button from "../../Button/Button";

const HomePage = (): React.ReactElement => {
  return (
    <div className="homepage">
      <h2 className="homepage__header">
        Consulta que espacios tienen su acústica registrada o añade el tuyo.
      </h2>
      <div className="homepage__elements">
        <img
          src="/img/home-page-drawing.png"
          alt="Botón para cerrar sesión de usuario"
          width="274"
          height="247"
          className="homepage__image"
        />
        <Button className="login-button" actionOnClick={() => {}}>
          <>
            <img
              src="/img/github.png"
              alt="Botón para iniciar sesión de usuario"
              width="28"
              height="28"
              className="login-button__image"
            />
            <span className="login-button__text">Entra con GitHub</span>
          </>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
