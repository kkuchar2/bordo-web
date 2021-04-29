import {Route, Switch} from "react-router-dom";
import React, {useCallback} from "react";
import {routes} from "../routes/routes.js";
import {AuthRoute} from "../routes/AuthRoute.js";
import {withSuspense} from "util/withSuspense.js";
import {lazyImport} from "util/util.js";
import {SimpleRoute} from "routes/SimpleRoute.js";
const NotFound = lazyImport(() => import (/* webpackChunkName: "not-found" */ "pages/NotFound"));

function Content() {
    const mapRoutesToContent = useCallback(() => routes.filter(v => v.enabled)
        .map((p, k) => {
            if (p.authRequired) {
                return <AuthRoute key={k} exact={p.exact} path={p.path} component={p.component}/>;
            }
            else {
                return <SimpleRoute key={k} exact={p.exact} path={p.path} component={p.component}/>;
            }
        }), []);

    return <Switch>
        {mapRoutesToContent()}
        {<Route component={withSuspense(NotFound)} key={0}/>}
    </Switch>;
}

export default Content;