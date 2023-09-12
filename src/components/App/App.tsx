import { Navigate, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import paths from "../../paths/paths";
import HomePage from "../../pages/HomePage/HomePage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import React, { Suspense } from "react";
import "./App.css";
import { LazySpotsListPage } from "../SpotsList/SpotsList";
import { LazyNavigationBar } from "../NavigationBar/NavigationBar";
import { useAppSelector } from "../../store";
import ErrorFeedback from "../ErrorFeedback/ErrorFeedback";
import Loader from "../Loader/Loader";

const App = (): React.ReactElement => {
  const [user] = useAuthState(auth);
  const isError = useAppSelector((state) => state.uiStore.isError);
  const isLoading = useAppSelector((state) => state.uiStore.isLoading);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorFeedback />}
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
        </Routes>

        {user && (
          <Suspense>
            <LazyNavigationBar />
          </Suspense>
        )}
      </div>
    </>
  );
};

export default App;
