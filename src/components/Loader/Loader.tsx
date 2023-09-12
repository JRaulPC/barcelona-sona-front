import "./Loader.css";

const Loader = (): React.ReactElement => {
  return (
    <div className="loader">
      <div className="loader__loading" aria-label="loading-screen"></div>
    </div>
  );
};

export default Loader;
