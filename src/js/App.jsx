import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "redux/store.js";
import NavBar from "components/NavBar.jsx";
import Content from "pages/Content.jsx"
import {ToastContainer} from 'react-toastify';
import CookieConsent from "react-cookie-consent";

import 'react-toastify/dist/ReactToastify.css';

import "styles/App.scss"

export default () => {

    return <Provider store={store}>
        <ToastContainer/>

        <BrowserRouter>
            <NavBar/>
            <Content/>
        </BrowserRouter>

        <CookieConsent
            location="bottom"
            buttonText="Agree"
            cookieName="cookieConsent"
            style={{background: "#2B373B"}}
            buttonStyle={{color: "#4e503b", fontSize: "13px"}}
            expires={150}>
            This website uses cookies to enhance the user experience.{" "}
        </CookieConsent>
    </Provider>
}