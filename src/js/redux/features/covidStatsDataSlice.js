const NAME = 'covid_stats/';

import {buildDefaultAsyncThunk, buildDefaultSlice, createDefaultEntityAdapter} from "redux/util.js";

/*
 * Create adapter for covid data
 */
const covidStatsAdapter = createDefaultEntityAdapter()

/*
 * Create async covid data fetch thunk
 */
export const fetchCovidStatsData = buildDefaultAsyncThunk(NAME)

/*
 * Create selectors
 */
export const {
    selectAll: selectAllCovidStats,
    selectById: selectCovidStatById,
} = covidStatsAdapter.getSelectors(state => state.covidStatsData)

/*
 * Create default slice for data received (sets all)
 */
export default buildDefaultSlice(NAME, fetchCovidStatsData, covidStatsAdapter);