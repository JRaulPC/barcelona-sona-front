import { lazy } from "react";

export const LazyNewSpotPage = lazy(() => import("../NewSpotPage/NewSpotPage"));

export const LazySpotsListPage = lazy(
  () => import("../../pages/SpotsListPage/SpotsListPage"),
);

export const LazyPage404 = lazy(() => import("../Page404/Page404"));

export const LazyDetailPage = lazy(
  () => import("../SpotDetailPage/SpotDetailPage"),
);

export const LazyRegisterUserPage = lazy(
  () => import("../RegisterUserPage/RegisterUserPage"),
);
