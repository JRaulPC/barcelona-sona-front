import React, { Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../firebase";
import HomePage from "../../pages/HomePage/HomePage";
import {
  LazyDetailPage,
  LazyNewSpotPage,
  LazyPage404,
  LazyRegisterUserPage,
  LazySpotsListPage,
} from "../../pages/LazyPages/LazyPages";
import paths from "../../paths/paths";
import { useAppSelector } from "../../store";
import Feedback from "../Feedback/Feedback";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import NavigationBar from "../NavigationBar/NavigationBar";

import "./App.css";
import LoginPage from "../../pages/LoginPage/LoginPage";

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
          <Route path={paths.login} element={<LoginPage />} />
          <Route
            path={paths.register}
            element={
              <Suspense>
                <LazyRegisterUserPage />
              </Suspense>
            }
          />
          <Route
            path={paths.spots}
            element={
              <Suspense>
                <LazySpotsListPage />
              </Suspense>
            }
          />
          <Route
            path={paths.createSpot}
            element={
              <Suspense>
                <LazyNewSpotPage />
              </Suspense>
            }
          />
          <Route
            path={`${paths.spotDetail}/:id`}
            element={
              <Suspense>
                <LazyDetailPage />
              </Suspense>
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

        {user && <NavigationBar />}
      </div>
    </>
  );
};

export default App;
