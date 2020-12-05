import React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "redux/store.jsx";
import NavBar from "components/NavBar.jsx";
import {getPageContent} from "routes/Routes.jsx";
import { ToastContainer} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import "styles/App.scss"

export default () => {

    return <Provider store={store}>
        <BrowserRouter>
            <ToastContainer />
            <NavBar/>
            {getPageContent()}
            {/*<Footer/>*/}
        </BrowserRouter>
    </Provider>
}