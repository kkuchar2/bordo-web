import React from "react";
import {lazyImport} from "util/util.js";
import {withSuspense} from "util/withSuspense.js";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";

const MainPage = lazyImport(() => import (/* webpackChunkName: "main-page" */ "pages/MainPage"));
const SortPage = lazyImport(() => import (/* webpackChunkName: "sort-page" */ "pages/SortPage"));
const RegistrationPage = lazyImport(() => import (/* webpackChunkName: "registration-page" */ "pages/RegistrationPage"));
const ConfirmPage = lazyImport(() => import (/* webpackChunkName: "confirm-page" */ "pages/ConfirmPage"));
const LoginPage = lazyImport(() => import (/* webpackChunkName: "login-page" */ "pages/LoginPage"));
const LogoutPage = lazyImport(() => import (/* webpackChunkName: "logout-page" */ "pages/LogoutPage"));
const Dashboard = lazyImport(() => import (/* webpackChunkName: "dashboard" */ "pages/Dashboard"));
const SettingsPage = lazyImport(() => import (/* webpackChunkName: "dashboard" */ "pages/SettingsPage"));
const PathfindingPage = lazyImport(() => import (/* webpackChunkName: "grid-page" */ "pages/PathfindingPage"));
const NotFound = lazyImport(() => import (/* webpackChunkName: "not-found" */ "pages/NotFound"));

// const ChartPage = lazyImport(() => import (/* webpackChunkName: "chart-page" */ "pages/ChartPage"));

export const routes = [
    {
        component: withSuspense(NotFound),
        exact: false,
        anonymousUser: true
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
        anonymousUser: true
    },
    {
        path: "/sort",
        component: withSuspense(SortPage),
        title: "SORTING ALGORITHMS",
        enabled: true,
        navbar: true,
        alignment: 'left',
        exact: true,
        anonymousUser: true
    },
    // {
    //     path: "/chart",
    //     component: withSuspense(ChartPage),
    //     title: "COVID-19 IN POLAND",
    //     enabled: true,
    //     navbar: true,
    //     alignment: 'left',
    //     exact: true,
    //     anonymousUser: true
    // },
    {
        path: "/login",
        component: withSuspense(LoginPage),
        customClass: 'logInButton',
        title: "Sign in",
        enabled: true,
        navbar: true,
        alignment: 'right',
        exact: true,
        anonymousUser: true
    },
    {
        path: "/register",
        component: withSuspense(RegistrationPage),
        customClass: 'registerButton',
        title: "Sign up",
        enabled: true,
        navbar: true,
        alignment: 'right',
        exact: true,
        anonymousUser: true
    },
    {
        path: "/verify-email/:token",
        component: withSuspense(ConfirmPage),
        exact: false,
        enabled: true,
        anonymousUser: true
    },
    {
        path: "/dashboard",
        component: withSuspense(Dashboard),
        exact: false,
        enabled: true,
        anonymousUser: false
    },
    {
        path: "/settings",
        component: withSuspense(SettingsPage),
        customComponent: <FontAwesomeIcon className={"icon"} icon={faCog}/>,
        enabled: true,
        navbar: true,
        alignment: 'right',
        exact: true,
        anonymousUser: false
    },
    {
        path: "/pathfindig",
        component: withSuspense(PathfindingPage),
        title: "PATHFINDING VISUALIZER",
        enabled: true,
        navbar: true,
        alignment: 'left',
        exact: true,
        anonymousUser: true
    },
    {
        path: "/logout",
        component: withSuspense(LogoutPage),
        customClass: 'logoutButton',
        title: "Logout",
        enabled: true,
        navbar: true,
        alignment: 'right',
        exact: true,
        anonymousUser: false
    }
];

export const isOnAuthenticatedPage = () => {
    return find(routes.filter(v => v.path === window.location.pathname, v => !v.anonymousUser));
};