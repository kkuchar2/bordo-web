import {Route, Switch} from "react-router-dom";
import React, {Suspense} from "react";
import {useSelector} from "react-redux";
import NotFound from "./NotFound.jsx";
import {routes} from "../routes/routes.js";
import {withCondition} from "util/util.js";

export default () => {

    const navbarState = useSelector(state => state.navbar);

    const mapRoutesToContent = () => routes.filter(v => v.enabled)
        .map((p, k) => <Route exact path={p.path} component={p.component} key={k}/>);

    return <Switch>
        <Suspense fallback={null}>
            {withCondition(navbarState.opened, () => <div className={"pageOverlay"}/>)}
            <div className={"page"}>
                {mapRoutesToContent()}
            </div>
        </Suspense>
        <Route component={NotFound} key={0}/>
    </Switch>
}