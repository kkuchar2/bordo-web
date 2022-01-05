import React, {lazy} from "react";

import {Button} from "kuchkr-react-component-library";

const RegistrationPage = React.lazy(() => import(/* webpackChunkName: "auth-chunk" */ "pages/RegistrationPage/RegistrationPage"));
const ConfirmPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ConfirmPage/ConfirmPage"));
const LoginPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/LoginPage/LoginPage"));
const ForgotPasswordPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ForgotPasswordPage/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ResetPasswordPage/ResetPasswordPage"));
const HomePage = lazy(() => import (/* webpackChunkName: "home" */ "pages/HomePage/HomePage"));
const NotFound = lazy(() => import (/* webpackChunkName: "not-found" */ "pages/NotFoundPage/NotFoundPage"));

export const routes = [
    {
        path: "*",
        element: <NotFound />,
        enabled: true
    },
    {
        path: "/",
        element: <LoginPage />,
        icon: '',
        title: "",
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: false
    },
    {
        path: "/register",
        element: <RegistrationPage />,
        customComponent: <Button theme={Button.darkTheme} text={"Create account"}/>,
        customClass: 'registerButton',
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/verify-email/:token",
        element: <ConfirmPage />,
        exact: false,
        enabled: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/home",
        element: <HomePage />,
        exact: false,
        enabled: true,
        authRequired: true,
        hiddenForAuthenticated: false
    },
    {
        path: "/forgotPassword",
        element: <ForgotPasswordPage />,
        title: "Forgot password",
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/resetPassword/:token",
        element: <ResetPasswordPage />,
        title: "Change password",
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: false
    }
];

const getCurrentRoute = () => routes.filter(v => v.path === window.location.pathname)[0];

export const isOnAuthenticatedPage = () => {
    const route = getCurrentRoute();

    if (route) {
        return route.authRequired;
    }
    return false;
};