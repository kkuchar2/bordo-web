import {Route, Switch} from "react-router-dom";
import React, {lazy, Suspense} from "react";

const MainPage = lazy(() => import (/* webpackChunkName: "main-page" */ "pages/MainPage.jsx"));
const NotFound = lazy(() => import (/* webpackChunkName: "not-found" */ "pages/NotFound.jsx"));
const SortPage = lazy(() => import (/* webpackChunkName: "sort-page" */ "pages/SortPage.jsx"));

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
    }
];

const mapRoutesToContent = () => {
    return routes.filter(v => v.enabled).map((p, k) => {
        return <Route exact path={p.path} component={p.component} key={k}/>;
    });
}

export const getPageContent = () => {
    return <Switch>
        <Suspense fallback={null}>
            <div className={"page"}>
                {mapRoutesToContent()}
            </div>
        </Suspense>
        <Route component={NotFound} key={0}/>
    </Switch>
}