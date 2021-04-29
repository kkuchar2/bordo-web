import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "redux/store.js";
import NavBar from "components/NavBar";
import Content from "pages/Content";
import Dialogs from "components/Dialogs";
import AppManager from "AppManager.jsx";

import "styles/App.scss";

function App() {
    return <Provider store={store}>
        <BrowserRouter>
            <AppManager />
            <NavBar/>
            <Content/>
            <Dialogs/>
        </BrowserRouter>
    </Provider>;
}

export default App;