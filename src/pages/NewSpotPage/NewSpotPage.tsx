import { Helmet } from "react-helmet";
import NewSpotForm from "../../components/NewSpotForm/NewSpotForm";
import "./NewSpotPage.css";
import FormWrapper from "../../components/FormWrapper/FormWrapper";

const NewSpotPage = () => {
  return (
    <>
      <Helmet>
        <title>Barcelona Sona - Añadir un nuevos espacio</title>
        <meta
          name="description"
          content="En esta página puedes añadir un nuevo espacio a la lista"
        />
      </Helmet>
      <main className="new-spot-page">
        <h2 className="new-spot-page__title">Añade un nuevo espacio</h2>
        <FormWrapper>
          <NewSpotForm />
        </FormWrapper>
      </main>
    </>
  );
};

export default NewSpotPage;
