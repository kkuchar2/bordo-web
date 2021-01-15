import React from "react";
import {lazyImport} from "util/util.js";

const MainPage = lazyImport(() => import (/* webpackChunkName: "main-page" */ "pages/MainPage.jsx"));
const SortPage = lazyImport(() => import (/* webpackChunkName: "sort-page" */ "pages/SortPage.jsx"));
const ChartPage = lazyImport(() => import (/* webpackChunkName: "chart-page" */ "pages/ChartPage.jsx"));
const RegistrationPage = lazyImport(() => import (/* webpackChunkName: "registration-page" */ "pages/RegistrationPage.jsx"));
const LoginPage = lazyImport(() => import (/* webpackChunkName: "login-page" */ "pages/LoginPage.jsx"));
const NotFound = lazyImport(() => import (/* webpackChunkName: "not-found" */ "pages/NotFound.jsx"));

export const routes = [
    {
        path: "/",
        component: MainPage,
        icon: '',
        title: "",
        enabled: true,
        navbar: false,
        alignment: 'left'
    },
    {
        path: "/sort",
        component: SortPage,
        icon: 'images/sort_icon.png',
        title: "Sorting algorithms",
        enabled: true,
        navbar: true,
        alignment: 'left'
    },
    {
        path: "/chart",
        component: ChartPage,
        icon: 'images/area-chart.png',
        title: "COVID-19 in Poland",
        enabled: true,
        navbar: true,
        alignment: 'left'
    },
    {
        path: "/login",
        component: LoginPage,
        customClass: 'logInButton',
        title: "Sign in",
        enabled: true,
        navbar: true,
        alignment: 'right'
    },
    {
        path: "/register",
        component: RegistrationPage,
        customClass: 'registerButton',
        title: "Sign up",
        enabled: true,
        navbar: true,
        alignment: 'right'
    }
];
