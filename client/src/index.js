import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from "react-router-dom";

import exactIndexRoutes from "routes/exactRoutes.jsx";
import indexRoutes from "routes/indexRoutes.jsx";

import NotFound from "layouts/NotFound.jsx";
import {Provider} from "react-redux";
import {store} from "./redux/store";

import "./index.scss"

ReactDOM.render(
    <div className="commonPage">
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    {exactIndexRoutes.map((p, k) => <Route exact path={p.path} component={p.component} key={k}/>)}
                    {indexRoutes.map((p, k) => <Route path={p.path} component={p.component} key={k}/>)}
                    <Route component={NotFound} key={0}/>
                </Switch>
            </HashRouter>
        </Provider>
    </div>,
    document.getElementById('root')
);