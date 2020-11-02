import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import OverlayGradient from "../src/components/overlay/OverlayGradient.jsx";
import exactIndexRoutes from "routes/exactRoutes.jsx";
import NotFound from "../src/pages/NotFound.jsx";
import NavBar from "../src/components/navbar/NavBar.jsx";
import NavBarItem from "components/navbar/navbar-item/NavBarItem.jsx";

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
        <OverlayGradient startColor={"rgba(174,77,129,0.67)"} endColor={"rgba(215,83,65, 0.8)"} zindex={-10}/>
        <NavBar>
            <NavBarItem iconSrc={'src/images/sort_icon.png'}  href={'/sort'}>Sorting algorithms</NavBarItem>
        </NavBar>
        <BrowserRouter>
            <Switch>
                {mapRoutes()}
                <Route component={NotFound} key={0}/>
            </Switch>
        </BrowserRouter>
    </div>,
    document.getElementById('root')
);