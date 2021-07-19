import {Button} from "kuchkr-react-component-library";
import React from "react";
import {lazyImport} from "util/util.js";
import {withSuspense} from "util/withSuspense.js";

const RegistrationPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/RegistrationPage/RegistrationPage.jsx"));
const ConfirmPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ConfirmPage/ConfirmPage.jsx"));
const LoginPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/LoginPage/LoginPage.jsx"));
const ForgotPasswordPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ForgotPasswordPage/ForgotPasswordPage.jsx"));
const ChangePasswordPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ChangePasswordPage/ChangePasswordPage.jsx"));
const Dashboard = lazyImport(() => import (/* webpackChunkName: "dashboard" */ "pages/DashboardPage/DashboardPage.jsx"));

export const routes = [
    {
        path: "/",
        component: withSuspense(LoginPage),
        icon: '',
        title: "",
        enabled: true,
        navbar: false,
        alignment: 'left',
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
        navbar: true,
        alignment: 'right',
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
        path: "/dashboard",
        component: withSuspense(Dashboard),
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
        navbar: false,
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/changePassword/:token",
        component: withSuspense(ChangePasswordPage),
        title: "Change password",
        enabled: true,
        navbar: false,
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

export const isOnAuthShadowedPage = () => getCurrentRoute().hiddenForAuthenticated;

export const isOnLoginPage = () => window.location.pathname === '/';

export const isOnAccountConfirmPage = () => (/^\/verify-email\/(.*)$/).test(window.location.pathname);