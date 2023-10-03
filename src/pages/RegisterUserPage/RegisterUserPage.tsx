import NewUserForm from "../../components/NewUserForm/NewUserForm";
import FormWrapper from "../../components/FormWrapper/FormWrapper";
import "./RegisterUserPage.css";
import { Link } from "react-router-dom";
import paths from "../../paths/paths";

const RegisterUserPage = () => {
  return (
    <>
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
