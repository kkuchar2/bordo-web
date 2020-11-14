import React, {Suspense} from "react";
import withClearCache from "js/util/ClearCache.jsx";
import {Provider} from "react-redux";
import {store} from "js/redux/store.jsx";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NavBar from "js/components/navbar/NavBar.jsx";
import NotFound from "js/pages/NotFound.jsx";
import Footer from "js/components/footer/Footer.jsx";

import {GridPage, MainPage, SortPage} from "js/pages";

import "./App.scss"

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavBar/>
                <Switch>
                    <Suspense fallback={null}>
                        <div className={"page"}>
                            <Route exact path={'/'} component={MainPage}/>
                            <Route exact path={'/sort'} component={SortPage}/>
                            <Route exact path={'/grid'} component={GridPage}/>
                            <Route exact path={'/gallery'} component={GridPage}/>
                        </div>
                    </Suspense>
                    <Route component={NotFound} key={0}/>
                </Switch>
                <Footer/>
            </BrowserRouter>
        </Provider>
    );
}

export default withClearCache(App);