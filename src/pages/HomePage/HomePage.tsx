import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { auth, gitHubAuthProvider } from "../../firebase";
import paths from "../../paths/paths";
import "./HomePage.css";
import { Helmet } from "react-helmet";

const HomePage = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  const login = async () => {
    await signInWithPopup(auth, gitHubAuthProvider);
  };

  if (user) {
    return <Navigate to={paths.spots} />;
  }

  return (
    <>
      <Helmet>
        <title>Barcelona Sona</title>
        <meta
          name="description"
          content="Consulta los espacios de Barcelona que tienen su acústica registrada y 
          aprende sobre el património acústico de la ciudad de Barcelona"
        />
      </Helmet>
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
          <Button className="button-primary" actionOnClick={login}>
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
    </>
  );
};

export default HomePage;
