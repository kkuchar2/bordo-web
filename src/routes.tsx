import React, {lazy} from "react";

import {Button} from "kuchkr-react-component-library";

import {withSuspense} from "./api/withSuspense";

const RegistrationPage = React.lazy(() => import(/* webpackChunkName: "auth-chunk" */ "pages/RegistrationPage/RegistrationPage"));
const ConfirmPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ConfirmPage/ConfirmPage"));
const LoginPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/LoginPage/LoginPage"));
const ForgotPasswordPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ForgotPasswordPage/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ResetPasswordPage/ResetPasswordPage"));
const HomePage = lazy(() => import (/* webpackChunkName: "home" */ "pages/HomePage/HomePage"));

export const routes = [
    {
        path: "/",
        component: withSuspense(LoginPage),
        icon: '',
        title: "",
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: false
    },
    {
        path: "/register",
        component: withSuspense(RegistrationPage),
        customComponent: <Button theme={Button.darkTheme} text={"Create account"}/>,
        customClass: 'registerButton',
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/verify-email/:token",
        component: withSuspense(ConfirmPage),
        exact: false,
        enabled: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/home",
        component: withSuspense(HomePage),
        exact: false,
        enabled: true,
        authRequired: true,
        hiddenForAuthenticated: false
    },
    {
        path: "/forgotPassword",
        component: withSuspense(ForgotPasswordPage),
        title: "Forgot password",
        enabled: true,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/resetPassword/:token",
        component: withSuspense(ResetPasswordPage),
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