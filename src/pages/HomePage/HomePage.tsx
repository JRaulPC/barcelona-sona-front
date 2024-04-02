import { browserPopupRedirectResolver, signInWithPopup } from "firebase/auth";
import { Helmet } from "react-helmet";
import { Navigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import LoginForm from "../../components/LoginForm/LoginForm";
import { auth, gitHubAuthProvider } from "../../firebase";
import paths from "../../paths/paths";
import "./HomePage.css";

const HomePage = (): React.ReactElement => {
  const loginWithGithub = async () => {
    await signInWithPopup(
      auth,
      gitHubAuthProvider,
      browserPopupRedirectResolver,
    );
  };

  return <Navigate to={paths.spots} />;

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
        <h1 className="homepage__site-title">Barcelona SONA</h1>
        <div className="homepage__title">
          <h2 className="homepage__title-text">
            Consulta que espacios tienen su acústica registrada o añade el tuyo.
          </h2>
        </div>
        <div className="homepage__elements">
          <FormWrapper>
            <LoginForm />
          </FormWrapper>
          <Button className="button-primary" actionOnClick={loginWithGithub}>
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
