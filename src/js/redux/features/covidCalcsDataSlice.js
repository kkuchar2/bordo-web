const NAME = 'covid_calcs/';

import {buildDefaultAsyncThunk, buildDefaultSlice, createDefaultEntityAdapter} from "redux/util.js";

const covidCalcsAdapter = createDefaultEntityAdapter()

export const fetchCovidCalcsData = buildDefaultAsyncThunk(NAME)

export const {
    selectAll: selectAllCovidCalcs,
    selectById: selectCovidCalcById,
} = covidCalcsAdapter.getSelectors(state => state.covidCalcsData)

export default buildDefaultSlice(NAME, fetchCovidCalcsData, covidCalcsAdapter);