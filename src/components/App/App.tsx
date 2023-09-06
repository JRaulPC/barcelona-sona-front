import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";

import "./App.css";
import paths from "../../paths/paths";

const App = (): React.ReactElement => {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={paths.homePage} />} />
        <Route path="/home" element={<Navigate to={paths.homePage} />} />
      </Routes>
      <NavigationBar />
    </div>
  );
};

export default App;
