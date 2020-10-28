import MainPage from "../pages/MainPage.jsx";
import SortPage from "../pages/SortPage.jsx";
import CanvasPage from "../pages/CanvasPage.jsx";
import Covid19Page from "pages/COVI19Page.jsx";

const exactIndexRoutes = [
    {path: "/", component: MainPage},
    {path: "/covid", component: Covid19Page},
    {path: "/sort", component: SortPage},
    {path: "/canvas", component: CanvasPage}
];

export default exactIndexRoutes;