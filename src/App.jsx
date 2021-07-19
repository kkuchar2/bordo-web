import Content from "./Content";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "appRedux/store.js";
import AppManager from "./AppManager";

import "./App.scss";

function App() {
    return <Provider store={store}>
        <BrowserRouter>
            <AppManager/>
            <Content/>
            {/*<Dialogs/>*/}
        </BrowserRouter>
    </Provider>;
}

export default App;