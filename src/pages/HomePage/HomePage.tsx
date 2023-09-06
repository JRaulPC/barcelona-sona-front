import "./HomePage.css";
import Button from "../../components/Button/Button";
import { auth, gitHubAuthProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const HomePage = (): React.ReactElement => {
  const navigate = useNavigate();

  const login = async () => {
    await signInWithPopup(auth, gitHubAuthProvider);
    navigate("/espacios");
  };

  return (
    <div className="homepage">
      <h2 className="homepage__header">
        Consulta que espacios tienen su acústica registrada o añade el tuyo.
      </h2>
      <div className="homepage__elements">
        <img
          src="/img/home-page-drawing.svg"
          alt="Fondo de la pantalla pagina de inicio"
          width="274"
          height="247"
          className="homepage__image"
        />
        <Button className="login-button" actionOnClick={login}>
          <>
            <img
              src="/img/github.svg"
              alt="Botón para iniciar sesión de usuario"
              width="28"
              height="28"
              className="login-button__image"
            />
            <span
              aria-label="Botón para iniciar sesión de usuario"
              className="login-button__text"
            >
              Entra con GitHub
            </span>
          </>
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
