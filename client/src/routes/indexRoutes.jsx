import RegistrationPage from "layouts/RegistrationPage.jsx";
import RegistrationConfirmationPage from "layouts/RegistrationConfirmationPage.jsx";

const indexRoutes = [
    {path: "/register", component: RegistrationPage},
    {path: "/api/activate/:uid/:token", component: RegistrationConfirmationPage},
];

export default indexRoutes;