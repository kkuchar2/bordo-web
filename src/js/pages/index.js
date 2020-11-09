import {lazy} from "react";

const CanvasPage = lazy(() => import ("js/pages/CanvasPage.jsx"));
const MainPage = lazy(() => import ("js/pages/MainPage.jsx"));
const NotFound = lazy(() => import ("js/pages/NotFound.jsx"));
const SortPage = lazy(() => import ("js/pages/SortPage.jsx"));
const GridPage = lazy(() => import ("js/pages/GridPage.jsx"));

export {
    CanvasPage,
    GridPage,
    MainPage,
    NotFound,
    SortPage
};