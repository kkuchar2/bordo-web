import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import exactIndexRoutes from "js/routes/exactRoutes.jsx";
import NotFound from "./js/pages/NotFound.jsx";
import NavBar from "./js/components/navbar/NavBar.jsx";
import NavBarItem from "js/components/navbar/navbar-item/NavBarItem.jsx";

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
        <BrowserRouter>
            <NavBar>
                <NavBarItem iconSrc={'images/sort_icon.png'} href={'/sort'}>Sorting algorithms</NavBarItem>
                <NavBarItem iconSrc={'images/grid_icon.png'} href={'/grid'}>Grid</NavBarItem>
            </NavBar>
            <Switch>
                <Suspense fallback={null}>
                    {mapRoutes()}
                </Suspense>
                <Route component={NotFound} key={0}/>
            </Switch>
        </BrowserRouter>
    </div>,
    document.getElementById('root')
);