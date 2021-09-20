import {configureStore} from '@reduxjs/toolkit';
import {dialogReducer, modelViewReducer} from "appRedux/reducers/application";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

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
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['your/action/type'],
                // Ignore these field paths in all actions
                ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
                // Ignore these paths in the state
                ignoredPaths: ['items.dates'],
            },
        }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

//////////////////////////////////////////////////////////////////////////////////////
export const API_URL = isProduction ? "https://api.kkucharski.com/api/" : 'http://0.0.0.0:8001/api/';
//////////////////////////////////////////////////////////////////////////////////////
