import {configureStore} from '@reduxjs/toolkit';
import {
    authReducer,
    confirmReducer,
    forgotPasswordReducer,
    registrationReducer,
    resetPasswordReducer
} from "appRedux/reducers/api/account";

import {getModelDataReducer, listModelsReducer, updateModelDataReducer} from "appRedux/reducers/api/crud";

import {
    dialogReducer,
    modelViewReducer,
    mouseReducer,
    navbarReducer,
    themeReducer
} from "appRedux/reducers/application";
import thunkMiddleware from 'redux-thunk';

export const store = configureStore({
    reducer: {
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
        registration: registrationReducer,
        auth: authReducer,
        listModels: listModelsReducer,
        getModelData: getModelDataReducer,
        updateModelData: updateModelDataReducer,
        modelView: modelViewReducer,
        dialog: dialogReducer,
        mouse: mouseReducer,
        confirm: confirmReducer,
        navbar: navbarReducer,
        theme: themeReducer,
    },
    middleware: [thunkMiddleware]
});