import {Route, Switch} from "react-router-dom";
import React, {useCallback} from "react";
import {routes} from "routes";
import {withSuspense} from "util/withSuspense.js";
import {lazyImport} from "util/util.js";

const NotFound = lazyImport(() => import (/* webpackChunkName: "not-found" */ "pages/NotFoundPage/NotFoundPage.jsx"));

const Content = () => {
    const mapRoutesToContent = useCallback(() => routes.filter(v => v.enabled)
        .map((p, k) => {
            return <Route key={k} exact={p.exact} path={p.path} component={p.component}/>;
        }), []);

    return <Switch>
        {mapRoutesToContent()}
        {<Route component={withSuspense(NotFound)} key={0}/>}
    </Switch>;
};

export default Content;