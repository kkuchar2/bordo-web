import {Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
import {lazyImport} from "util/Util.jsx";

const MainPage = lazyImport(() => import (/* webpackChunkName: "main-page" */ "pages/MainPage.jsx"));
const NotFound = lazyImport(() => import (/* webpackChunkName: "not-found" */ "pages/NotFound.jsx"));
const SortPage = lazyImport(() => import (/* webpackChunkName: "sort-page" */ "pages/SortPage.jsx"));
const ChartPage = lazyImport(() => import (/* webpackChunkName: "chart-page" */ "pages/ChartPage.jsx"));

export const routes = [
    {
        path: "/",
        component: MainPage,
        icon: '',
        title: "",
        enabled: true,
        navbar: false
    },
    {
        path: "/sort",
        component: SortPage,
        icon: 'images/sort_icon.png',
        title: "Sorting algorithms",
        enabled: true,
        navbar: true
    },
    {
        path: "/chart",
        component: ChartPage,
        icon: 'images/area-chart.png',
        title: "COVID-19",
        enabled: true,
        navbar: true
    }
];

export const getPageContent = () => {

    const mapRoutesToContent = () => routes.filter(v => v.enabled)
        .map((p, k) => <Route exact path={p.path} component={p.component} key={k}/>);

    return <Switch>
        <Suspense fallback={null}>
            <div className={"page"}>
                {mapRoutesToContent()}
            </div>
        </Suspense>
        <Route component={NotFound} key={0}/>
    </Switch>
}