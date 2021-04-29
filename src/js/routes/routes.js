import React from "react";
import {lazyImport} from "util/util.js";
import {withSuspense} from "util/withSuspense.js";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";

const MainPage = lazyImport(() => import (/* webpackChunkName: "main-page" */ "pages/MainPage"));
const SortPage = lazyImport(() => import (/* webpackChunkName: "sort-page" */ "pages/SortPage"));
const RegistrationPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/RegistrationPage"));
const ConfirmPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ConfirmPage"));
const LoginPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/LoginPage"));
const ForgotPasswordPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ForgotPasswordPage"));
const ChangePasswordPage = lazyImport(() => import (/* webpackChunkName: "auth-chunk" */ "pages/ChangePasswordPage"));
const Dashboard = lazyImport(() => import (/* webpackChunkName: "dashboard" */ "pages/Dashboard"));
const SettingsPage = lazyImport(() => import (/* webpackChunkName: "dashboard" */ "pages/SettingsPage"));
const PathfindingPage = lazyImport(() => import (/* webpackChunkName: "grid-page" */ "pages/PathfindingPage"));
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
        component: withSuspense(MainPage),
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
        path: "/sort",
        component: withSuspense(SortPage),
        title: "SORTING ALGORITHMS",
        enabled: true,
        navbar: true,
        alignment: 'left',
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: false
    },
    {
        path: "/login",
        component: withSuspense(LoginPage),
        customClass: 'logInButton',
        title: "Sign in",
        enabled: true,
        navbar: true,
        alignment: 'right',
        exact: true,
        authRequired: false,
        hiddenForAuthenticated: true
    },
    {
        path: "/register",
        component: withSuspense(RegistrationPage),
        customClass: 'registerButton',
        title: "Create account",
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
        path: "/pathfinding",
        component: withSuspense(PathfindingPage),
        title: "PATHFINDING VISUALIZER",
        enabled: true,
        navbar: true,
        alignment: 'left',
        exact: true,
        authRequired: false,
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

export const isOnMainPage = () => getCurrentRoute().path === '/';

export const isOnLoginPage = () => getCurrentRoute().path === '/login';