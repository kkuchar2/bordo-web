import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {middlewares} from './middleware';
import appReducer from './reducers/application/appSlice';
import conversationsReducer from './reducers/conversations/conversationsSlice';
import dialogReducer from './reducers/dialog/dialogSlice';
import navbarReducer from './reducers/navbar/navbarSlice';
import pusherReducer from './reducers/pusher/pusherSlice';

const defaultMiddlewareOptions = {
    serializableCheck: false
};

export const store = configureStore({
    reducer: {
        conversations: conversationsReducer,
        app: appReducer,
        dialog: dialogReducer,
        navbar: navbarReducer,
        pusher: pusherReducer
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