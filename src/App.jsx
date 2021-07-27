import Dialogs from "components/Dialogs/Dialogs";
import i18n from "i18next";
import Content from "./Content";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "appRedux/store.js";
import AppManager from "./AppManager";

import './i18n';

import "./App.scss";

const App = () => {
    return <Provider store={store}>
        <BrowserRouter>
            <AppManager/>
            <Content/>
            <Dialogs/>
        </BrowserRouter>
    </Provider>;
};

export default App;