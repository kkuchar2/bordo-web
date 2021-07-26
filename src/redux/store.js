import thunkMiddleware from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';

import {mouseReducer, dialogReducer, navbarReducer, themeReducer} from "appRedux/reducers/application";
import {helloReducer} from "appRedux/reducers/api";
import {
    authReducer,
    confirmReducer,
    registrationReducer,
    forgotPasswordReducer,
    resetPasswordReducer
} from "appRedux/reducers/api/account";

export const store = configureStore({
    reducer: {
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
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