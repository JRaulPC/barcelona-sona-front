import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./App.css";
import paths from "../../paths/paths";
import HomePage from "../../pages/HomePage/HomePage";
import SpotsListPage from "../../pages/SpotsListPage/SpotsListPage";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={paths.homePage} />} />
        <Route path={paths.homePage} element={<HomePage />} />
        <Route path="/espacios" element={<SpotsListPage />} />
      </Routes>
      <NavigationBar />
    </div>
  );
};

export default App;
