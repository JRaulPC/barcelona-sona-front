import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import paths from "../../paths/paths";
import HomePage from "../../pages/HomePage/HomePage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import React, { Suspense } from "react";
import "./App.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import { useAppSelector } from "../../store";
import Feedback from "../Feedback/Feedback";
import Loader from "../Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
import {
  LazyNewSpotPage,
  LazyPage404,
  LazySpotsListPage,
} from "../../pages/LazyPages/LazyPages";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const isLoading = useAppSelector((state) => state.uiStore.isLoading);

  return (
    <>
      <Feedback />
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to={paths.homePage} />} />
          <Route path={paths.homePage} element={<HomePage />} />
          <Route
            path={paths.spots}
            element={
              <ProtectedRoute>
                <Suspense>
                  <LazySpotsListPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path={paths.createSpot}
            element={
              <ProtectedRoute>
                <Suspense>
                  <LazyNewSpotPage />
                </Suspense>
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <Suspense>
                <LazyPage404 />
              </Suspense>
            }
          />
        </Routes>

        {isLoading && <Loader />}

        {user && !isLoading && <NavigationBar />}
      </div>
    </>
  );
};

export default App;
