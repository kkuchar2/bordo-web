import {sendGetRequest} from "redux/util.js";
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const NAME = 'covid_stats/';

export const getCovidStatistics = sendGetRequest(NAME)

const adapter = createEntityAdapter();

export const { selectAll: getAllStatistics } = adapter.getSelectors(state => state.covidStatistics);

export default createSlice({
    name: NAME,
    initialState: adapter.getInitialState(),
    reducers: {},
    extraReducers: {
        [adapter.fulfilled]: adapter.setAll,
    },
}).reducer