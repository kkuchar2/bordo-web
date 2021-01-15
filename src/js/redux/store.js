import thunkMiddleware from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit'

import {connectionReducer} from "redux/reducers/connection.reducer.js";
import {navbarReducer} from "redux/reducers/navbar.reducer.js";
import {themeReducer} from "redux/reducers/theme.reducer.js";

import covidStatisticsReducer from './features/covidStatisticsSlice.js'
import covidCalcsDataReducer from './features/covidCalculationsSlice.js'
import registrationReducer from "./features/registrationSlice.js";
import loginReducer from "./features/loginSlice.js";

export const store = configureStore({
    reducer: {
        covidStatistics: covidStatisticsReducer,
        covidCalcsData: covidCalcsDataReducer,
        registration: registrationReducer,
        login: loginReducer,
        connection: connectionReducer,
        navbar: navbarReducer,
        theme: themeReducer,
    },
    middleware: [thunkMiddleware]
})