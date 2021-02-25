import {Route, Switch, useHistory} from "react-router-dom";
import React, {useEffect, useCallback} from "react";
import NotFound from "./NotFound";
import {routes, isOnAuthenticatedPage} from "../routes/routes.js";
import {withSuspense} from "util/withSuspense";
import {AuthRoute} from "../routes/AuthRoute.js";
import {useDispatch, useSelector} from "react-redux";
import {selectorAuth, tryLoginWithAuthKey} from "../redux/reducers/api/account";

function Content() {

    const dispatch = useDispatch();
    const authState = useSelector(selectorAuth);
    let history = useHistory();

    useEffect(() => dispatch(tryLoginWithAuthKey()), []);

    useEffect(() => {
        if (authState.isUserLoggedIn && isOnAuthenticatedPage()) {
            history.replace({pathname: "/"});
        }
    }, [authState]);

    const mapRoutesToContent = useCallback(() => routes.filter(v => v.enabled)
        .map((p, k) => {
            if (p.requireAuth) {
                return <AuthRoute key={k} exact={p.exact} path={p.path} component={p.component}/>;
            }
            else {
                return <Route key={k} exact={p.exact} path={p.path} component={p.component}/>;
            }
        }), []);

    return <Switch>
        {mapRoutesToContent()}
        <Route component={withSuspense(NotFound)} key={0}/>
    </Switch>;
}

export default Content;