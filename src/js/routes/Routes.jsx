import {GridPage, MainPage, NotFound, SortPage} from "js/pages";
import {Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";

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
        path: "/grid",
        component: GridPage,
        icon: 'images/grid_icon.png',
        title: "Grid",
        enabled: false,
        navbar: false
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