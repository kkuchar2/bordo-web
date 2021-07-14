import {Button} from "kuchkr-react-component-library";
import React from "react";
import {lazyImport} from "util/util.js";
import {withSuspense} from "util/withSuspense.js";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";

const RegistrationPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/RegistrationPage"));
const ConfirmPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ConfirmPage"));
const LoginPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/LoginPage"));
const ForgotPasswordPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ForgotPasswordPage"));
const ChangePasswordPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ChangePasswordPage"));
const Dashboard = lazyImport(() => import (/* webpackChunkName: "dashboard" */ "pages/Dashboard"));
const SettingsPage = lazyImport(() => import (/* webpackChunkName: "dashboard" */ "pages/SettingsPage"));
const NotFound = lazyImport(() => import (/* webpackChunkName: "not-found" */ "pages/NotFound"));

export const routes = [
    {
        component: withSuspense(NotFound),
        exact: false,
        authRequired: false,
        hiddenForAuthenticated: false
    },
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
        customComponent: <Button theme={Button.darkTheme} text={"Create account"} />,
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
        path: "/settings",
        component: withSuspense(SettingsPage),
        customComponent: <FontAwesomeIcon className={"icon"} icon={faCog}/>,
        enabled: true,
        navbar: true,
        alignment: 'right',
        exact: true,
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
        path: "/changePassword",
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

export const isOnAuthenticatedPage = () => getCurrentRoute().authRequired;

export const isOnAuthShadowedPage = () => getCurrentRoute().hiddenForAuthenticated;

export const isOnLoginPage = () => getCurrentRoute().path === '/';