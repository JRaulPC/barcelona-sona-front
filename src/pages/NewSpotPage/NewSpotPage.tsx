import "./NewSpotPage.css";
import NewSpot from "../../components/NewSpot/NewSpot";

const NewSpotPage = () => {
  return (
    <section className="new-spot-page">
      <h2 className="new-spot-page__title">Añade un nuevo espacio</h2>
      <NewSpot />
    </section>
  );
};

export default NewSpotPage;
