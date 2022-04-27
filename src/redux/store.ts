import {configureStore} from '@reduxjs/toolkit';
import {loggerMiddleware} from "appRedux/middleware/logger";
import {dialogReducer} from "appRedux/reducers/application";
import axios from "axios";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

import modelReducer from './reducers/api/crud/modelSlice';
import userReducer from './reducers/api/user/userSlice';
import modelViewReducer from './reducers/application/modelViewSlice';

const middlewares = [loggerMiddleware] as const;

const defaultMiddlewareOptions = {
    serializableCheck: false
};

export const store = configureStore({
    reducer: {
        userSlice: userReducer,
        model: modelReducer,
        modelView: modelViewReducer,
        dialog: dialogReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware(defaultMiddlewareOptions).concat(middlewares);
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// For development: switch to: http://0.0.0.0:8000
// For production: switch to: https://api.kkucharski.com

export const API_URL = "http://0.0.0.0:8000";

export const ApiClient = axios.create({
        baseURL: `${API_URL}/api/`,
        //timeout: 10000,
    }
);