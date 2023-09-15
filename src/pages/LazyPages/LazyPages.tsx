import { lazy } from "react";

export const LazyNewSpotPage = lazy(() => import("../NewSpotPage/NewSpotPage"));

export const LazySpotsListPage = lazy(
  () => import("../../pages/SpotsListPage/SpotsListPage"),
);

export const LazyPage404 = lazy(() => import("../Page404/Page404"));
