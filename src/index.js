import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from "react-router-dom";

import exactIndexRoutes from "routes/exactRoutes.jsx";
import NotFound from "../src/pages/NotFound.jsx";

import "./index.scss"

ReactDOM.render(
    <div className="commonPage">
        <HashRouter>
            <Switch>
                {exactIndexRoutes.map((p, k) => <Route exact path={p.path} component={p.component} key={k}/>)}
                <Route component={NotFound} key={0}/>
            </Switch>
        </HashRouter>
    </div>,
    document.getElementById('root')
);