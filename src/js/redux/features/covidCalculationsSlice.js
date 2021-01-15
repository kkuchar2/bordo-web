import {sendGetRequest} from "redux/util.js";
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const NAME = 'covid_calcs/';

export const getCovidCalculations = sendGetRequest(NAME)

const adapter = createEntityAdapter();

export const { selectAll: getAllCalculations } = adapter.getSelectors(state => state.covidCalcsData);

export default createSlice({
    name: NAME,
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [adapter.fulfilled]: adapter.setAll,
    },
}).reducer