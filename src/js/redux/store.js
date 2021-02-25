import thunkMiddleware from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';

import {mouseReducer, dialogReducer, navbarReducer, themeReducer} from "./reducers/application";
import {helloReducer} from "./reducers/api";
import {authReducer, confirmReducer, registrationReducer} from "./reducers/api/account";

export const store = configureStore({
    reducer: {
        registration: registrationReducer,
        auth: authReducer,
        hello: helloReducer,
        dialog: dialogReducer,
        mouse: mouseReducer,
        confirm: confirmReducer,
        navbar: navbarReducer,
        theme: themeReducer,
    },
    middleware: [thunkMiddleware]
});