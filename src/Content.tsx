import React, {lazy, useCallback} from "react";

import {AnimatePresence} from "framer-motion";
import {Route, Switch, useLocation} from "react-router-dom";

import {withSuspense} from "./api/withSuspense";
import {routes} from "./routes";

const NotFound = lazy(() => import (/* webpackChunkName: "not-found" */ "pages/NotFoundPage/NotFoundPage"));

const Content = () => {
    const location = useLocation();

    const mapRoutesToContent = useCallback(() => routes.filter((v: any) => v.enabled)
        .map((p, k) => {
            return <Route key={k} exact={p.exact} path={p.path} component={p.component}/>;
        }), []);

    return <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
            {mapRoutesToContent()}
            {<Route component={withSuspense(NotFound)} key={0}/>}
        </Switch>
    </AnimatePresence>;
};

export default Content;