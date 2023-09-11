import "./Loader.css";

const Loader = (): React.ReactElement => {
  return (
    <div className="loader">
      <span className="loader__text">Loading...</span>
      <div className="loader__loading" aria-label="loading-screen"></div>
    </div>
  );
};

export default Loader;
