import "./Loader.css";

const Loader = (): React.ReactElement => {
  return (
    <div aria-label="Pantalla de carga" className="loader">
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
    </div>
  );
};

export default Loader;
