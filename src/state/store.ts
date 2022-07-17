import {configureStore} from '@reduxjs/toolkit';
import axios from 'axios';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {loggerMiddleware} from './middleware/logger';
import accountReducer from './reducers/account/accountSlice';
import appReducer from './reducers/application/appSlice';
import modelReducer from './reducers/crud/modelSlice';
import dialogReducer from './reducers/dialog/dialogSlice';
import navbarReducer from './reducers/navbar/navbarSlice';

const middlewares = [loggerMiddleware] as const;

const defaultMiddlewareOptions = {
    serializableCheck: false
};

export const store = configureStore({
    reducer: {
        account: accountReducer,
        model: modelReducer,
        app: appReducer,
        dialog: dialogReducer,
        navbar: navbarReducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware(defaultMiddlewareOptions).concat(middlewares);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const appDispatch = store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// For development: switch to: http://localhost:8000
// For production: switch to: https://api.kkucharski.com

export const API_URL = 'http://localhost:8000';

export const ApiClient = axios.create({
    baseURL: `${API_URL}/api/`
    //timeout: 10000,
});
