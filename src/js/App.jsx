import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "redux/store.jsx";
import NavBar from "components/NavBar.jsx";
import Footer from "components/Footer.jsx";
import {getPageContent} from "routes/Routes.jsx";

import "styles/App.scss"

export default () =>
    <Provider store={store}>
        <BrowserRouter>
            <NavBar/>
            {getPageContent()}
            <Footer/>
        </BrowserRouter>
    </Provider>