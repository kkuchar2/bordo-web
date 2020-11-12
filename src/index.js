import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import exactIndexRoutes from "js/routes/exactRoutes.jsx";
import NotFound from "./js/pages/NotFound.jsx";
import NavBar from "./js/components/navbar/NavBar.jsx";
import {store} from "./js/redux/store.jsx";
import {Provider} from "react-redux";

import removeFbclid from "remove-fbclid";

import "./index.scss"

removeFbclid();

function mapRoutes() {
    return exactIndexRoutes.map((p, k) => {
        return <Route exact path={p.path} component={p.component} key={k}/>;
    });
}

ReactDOM.render(
    <div className="commonPage">
        <Provider store={store}>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Suspense fallback={null}>
                        {mapRoutes()}
                    </Suspense>
                    <Route component={NotFound} key={0}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    </div>,
    document.getElementById('root')
);