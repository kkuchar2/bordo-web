import {store} from "redux/store.js";
import {fetchCovidStatsData} from "redux/features/covidStatsDataSlice.js";
import {fetchCovidCalcsData} from "redux/features/covidCalcsDataSlice.js";
/**
 * Map of supported API calls
 */
const apiMapGET = {
    "covid_stats": fetchCovidStatsData,
    "covid_calcs": fetchCovidCalcsData
}

export const startServerPing = () => store.dispatch(startServerPing)

export const fetchAsyncGET = url => {
    if (!(url in apiMapGET)) {
        console.error(`No key in url map: '${url}'`);
        return;
    }
    return store.dispatch(apiMapGET[url]())
}