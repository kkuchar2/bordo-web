import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { middlewares } from './middleware';
import appReducer from './reducers/application/appSlice';
import dialogReducer from './reducers/dialog/dialogSlice';
import navbarReducer from './reducers/navbar/navbarSlice';

const defaultMiddlewareOptions = {
    serializableCheck: false
};

export const store = configureStore({
    reducer: {
        app: appReducer,
        dialog: dialogReducer,
        navbar: navbarReducer,
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