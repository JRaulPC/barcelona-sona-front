import NewUserForm from "../../components/NewUserForm/NewUserForm";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import "./RegisterUserPage.css";
import { Link, Navigate } from "react-router-dom";
import paths from "../../paths/paths";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Helmet } from "react-helmet";

const RegisterUserPage = () => {
  const [user, isLoading] = useAuthState(auth);

  if (!isLoading && user) {
    return <Navigate to={paths.spots} />;
  }

  return (
    <>
      <Helmet>
        <title>Barcelona Sona - Registro</title>
        <meta
          name="registro"
          content="En esta página puedes registrarte como usuario"
        />
      </Helmet>
      <main className="register-user-page">
        <h2 className="register-user-page__title">Crear cuenta</h2>
        <FormWrapper>
          <NewUserForm />
        </FormWrapper>
        <Link className="register-user-page__back-home" to={paths.homePage}>
          ¿Ya tienes una cuenta? Entra
        </Link>
      </main>
    </>
  );
};

export default RegisterUserPage;
