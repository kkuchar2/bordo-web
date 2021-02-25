import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "redux/store.js";
import NavBar from "components/NavBar";
import Content from "pages/Content";

import Dialogs from "components/Dialogs";

import "styles/App.scss";
import FPSMeter from "components/FPSMeter.jsx";
import CookieConsent from "react-cookie-consent";

function App() {
    return <Provider store={store}>
        <BrowserRouter>
            <NavBar/>
            <Content/>
            <Dialogs/>
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
        {/*<FPSMeter />*/}
    </Provider>;
}

export default App;