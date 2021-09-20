import {configureStore} from '@reduxjs/toolkit';
import {dialogReducer, modelViewReducer} from "appRedux/reducers/application";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunkMiddleware from 'redux-thunk';

import {
    authReducer,
    confirmReducer,
    forgotPasswordReducer,
    registrationReducer,
    resetPasswordReducer
} from "./reducers/api/account";
import {
    addItemToTableReducer,
    modelDataReducer,
    listModelsReducer
} from "./reducers/api/crud";

export const store = configureStore({
    reducer: {
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
        registration: registrationReducer,
        auth: authReducer,
        listModels: listModelsReducer,
        modelData: modelDataReducer,
        addItemToTable: addItemToTableReducer,
        modelView: modelViewReducer,
        dialog: dialogReducer,
        confirm: confirmReducer
    },
    middleware: [thunkMiddleware]
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// For development: switch to http://0.0.0.0:8001
export const API_URL = "https://api.kkucharski.com/api/";