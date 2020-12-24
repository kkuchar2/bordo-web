import thunkMiddleware from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit'
import covidStatsDataReducer from './features/covidStatsDataSlice.js'
import covidCalcsDataReducer from './features/covidCalcsDataSlice.js'
import {connectionReducer} from "redux/reducers/connection.reducer.js";
import {navbarReducer} from "redux/reducers/navbar.reducer.js";
import {themeReducer} from "redux/reducers/theme.reducer.js";

export const store = configureStore({
    reducer: {
        covidStatsData: covidStatsDataReducer,
        covidCalcsData: covidCalcsDataReducer,
        connection: connectionReducer,
        navbar: navbarReducer,
        theme: themeReducer,
    },
    middleware: [thunkMiddleware]
})