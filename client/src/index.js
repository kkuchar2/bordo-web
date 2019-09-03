import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import exactIndexRoutes from "routes/exactRoutes.jsx";
import indexRoutes from "routes/indexRoutes.jsx";

import NotFound from "layouts/NotFound.jsx";

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            {exactIndexRoutes.map((p, k) => <Route exact path={p.path} component={p.component} />)}
            {indexRoutes.map((p, k) => <Route path={p.path} component={p.component} />)}
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);