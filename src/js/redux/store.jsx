import thunkMiddleware from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit'
import covidDataReducer from './features/covidDataSlice.js'
import {connectionReducer} from "redux/reducers/connection.reducer.js";
import {navbarReducer} from "redux/reducers/navbar.reducer.js";

export const store = configureStore({
    reducer: {
        covidData: covidDataReducer,
        connection: connectionReducer,
        navbar: navbarReducer
    },
    middleware: [thunkMiddleware]
})

console.log(store.getState());