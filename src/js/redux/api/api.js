import {store} from "redux/store.jsx";
import {fetchCovidData} from "redux/features/covidDataSlice.js";

/**
 * Map of supported API calls
 */
const apiMapGET = {
    "covid" : fetchCovidData
}

export const startServerPing = () => store.dispatch(startServerPing)

export const fetchAsyncGET = url => store.dispatch(apiMapGET[url]())