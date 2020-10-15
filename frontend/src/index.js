import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import exactIndexRoutes from "routes/exactRoutes.jsx";
import NotFound from "../src/pages/NotFound.jsx";
import removeFbclid from "remove-fbclid";

import "./index.scss"

removeFbclid();

ReactDOM.render(
    <div className="commonPage">
        <BrowserRouter>
            <Switch>
                {exactIndexRoutes.map((p, k) => <Route exact path={p.path} component={p.component} key={k}/>)}
                <Route component={NotFound} key={0}/>
            </Switch>
        </BrowserRouter>
    </div>,
    document.getElementById('root')
);