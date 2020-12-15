const NAME = 'covid/';

import {buildDefaultAsyncThunk, buildDefaultSlice, createDefaultEntityAdapter} from "redux/util.js";

/*
 * Create adapter for covid data
 */
const covidAdapter = createDefaultEntityAdapter()

/*
 * Create async covid data fetch thunk
 */
export const fetchCovidData = buildDefaultAsyncThunk(NAME)

/*
 * Create selectors
 */
export const {
    selectAll: selectAllCovid,
    selectById: selectCovidById,
} = covidAdapter.getSelectors(state => state.covidData)

/*
 * Create default slice for data received (sets all)
 */
export default buildDefaultSlice(NAME, fetchCovidData, covidAdapter);