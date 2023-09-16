import "./NewSpotPage.css";
import NewSpotForm from "../../components/NewSpotForm/NewSpotForm";

const NewSpotPage = () => {
  return (
    <section className="new-spot-page">
      <h2 className="new-spot-page__title">Añade un nuevo espacio</h2>
      <NewSpotForm />
    </section>
  );
};

export default NewSpotPage;
