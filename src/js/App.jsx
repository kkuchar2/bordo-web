import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "js/redux/store.jsx";
import NavBar from "js/components/navbar/NavBar.jsx";
import Footer from "js/components/footer/Footer.jsx";
import {getPageContent} from "js/routes/Routes.jsx";

import "./App.scss"

export default () =>
    <Provider store={store}>
        <BrowserRouter>
            <NavBar/>
            {getPageContent()}
            <Footer/>
        </BrowserRouter>
    </Provider>