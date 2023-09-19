import "./NewSpotPage.css";
import NewSpotForm from "../../components/NewSpotForm/NewSpotForm";
import { Helmet } from "react-helmet";

const NewSpotPage = () => {
  return (
    <>
      <Helmet>
        <title>Añadir un nuevos espacio</title>
        <meta
          name="description"
          content="En esta página puedes añadir un nuevo espacio a la lista"
        />
      </Helmet>
      <section className="new-spot-page">
        <h2 className="new-spot-page__title">Añade un nuevo espacio</h2>
        <NewSpotForm />
      </section>
    </>
  );
};

export default NewSpotPage;
