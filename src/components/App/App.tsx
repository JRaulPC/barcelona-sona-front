import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar";
import paths from "../../paths/paths";
import HomePage from "../../pages/HomePage/HomePage";
import SpotsListPage from "../../pages/SpotsListPage/SpotsListPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import React from "react";
import "./App.css";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to={paths.homePage} />} />
        <Route path={paths.homePage} element={<HomePage />} />
        <Route
          path="/espacios"
          element={
            <ProtectedRoute>
              <SpotsListPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {user && <NavigationBar />}
    </div>
  );
};

export default App;
