import "./HomePage.css";
import Button from "../../components/Button/Button";
import { auth, gitHubAuthProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";
import paths from "../../paths/paths";
import { useAuthState } from "react-firebase-hooks/auth";

const HomePage = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  const login = async () => {
    await signInWithPopup(auth, gitHubAuthProvider);
  };

  if (user) {
    return <Navigate to={paths.spots} />;
  }

  return (
    <main className="homepage">
      <div className="homepage__title">
        <h2 className="homepage__title-text">
          Consulta que espacios tienen su acústica registrada o añade el tuyo.
        </h2>
      </div>
      <div className="homepage__elements">
        <img
          src="/img/home-page-drawing.svg"
          alt="Representación abstracta del efecto sonoro doppler"
          width="274"
          height="247"
          className="homepage__image"
          loading="eager"
        />
        <Button className="login" actionOnClick={login}>
          <>
            <img
              src="/img/github.svg"
              alt="Botón para iniciar sesión de usuario"
              width="28"
              height="28"
              className="login-button__image"
              loading="eager"
            />
            Entra con GitHub
          </>
        </Button>
      </div>
    </main>
  );
};

export default HomePage;
