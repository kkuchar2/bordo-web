import IndexPage from "layouts/IndexPage.jsx";
import HomePage from "layouts/HomePage.jsx";
import RegistrationConfirmationPage from "layouts/RegistrationConfirmationPage.jsx";

const exactIndexRoutes = [
    {path: "/", component: IndexPage},
    {path: "/home", component: HomePage},
    {path: "/confirm", component: RegistrationConfirmationPage}
];

export default exactIndexRoutes;