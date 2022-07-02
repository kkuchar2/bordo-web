import React from "react";

import lazy from "react-lazy-with-preload";

const RegistrationPage = lazy(() => import(/* webpackChunkName: "auth-chunk" */ "pages/RegistrationPage/RegistrationPage"));
const ConfirmPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ConfirmPage/ConfirmPage"));
const LoginPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/LoginPage/LoginPage"));
const ForgotPasswordPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ForgotPasswordPage/ForgotPasswordPage"));
const CreateNewPasswordPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/CreateNewPasswordPage/CreateNewPasswordPage"));
const HomePage = lazy(() => import (/* webpackChunkName: "home" */ "pages/HomePage/HomePage"));
const UserAgreement = lazy(() => import (/* webpackChunkName: "user-agreement" */ "pages/UserAgreementPage/UserAgreementPage"));
const NotFound = lazy(() => import (/* webpackChunkName: "not-found" */ "pages/NotFoundPage/NotFoundPage"));

LoginPage.preload();
RegistrationPage.preload();
ForgotPasswordPage.preload();

export const routes = [
    {
        path: "*",
        element: <NotFound/>,
        name: "NotFound",
        enabled: true
    },
    {
        path: "/",
        element: <LoginPage/>,
        name: "LoginPage",
        icon: '',
        title: "",
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: false
    },
    {
        path: "/register",
        element: <RegistrationPage/>,
        name: "RegistrationPage",
        customClass: 'registerButton',
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/verify-email/:token",
        element: <ConfirmPage/>,
        name: "ConfirmPage",
        exact: false,
        enabled: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/home",
        element: <HomePage/>,
        name: "HomePage",
        exact: false,
        enabled: true,
        authRequired: true,
        hiddenForAuthenticated: false
    },
    {
        path: "/forgotPassword",
        element: <ForgotPasswordPage/>,
        name: "ForgotPasswordPage",
        title: "Forgot password",
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/createNewPassword/:token",
        element: <CreateNewPasswordPage/>,
        name: "ResetPasswordPage",
        title: "Change password",
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: false
    },
    {
        path: "/userAgreement",
        element: <UserAgreement/>,
        name: "UserAgreementPage",
        title: "User agreement",
        enabled: true,
        authRequired: false,
        hiddenForAuthenticated: false
    },
];

const getCurrentRoute = () => routes.filter(v => v.path === window.location.pathname)[0];

export const isOnAuthenticatedPage = () => {
    const route = getCurrentRoute();

    if (route) {
        return route.authRequired;
    }
    return false;
};

export const urlMatchesComponent = (componentName: any) => {
    const route = getCurrentRoute();
    return componentName === route.name;
};