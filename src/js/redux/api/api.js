import {store} from "redux/store.js";
import {getCovidStatistics} from "redux/features/covidStatisticsSlice.js";
import {getCovidCalculations} from "redux/features/covidCalculationsSlice.js";
import {register} from "redux/features/registrationSlice.js";
import {login} from "redux/features/loginSlice.js";

const availableGetRequests = {
    "covid_stats": getCovidStatistics,
    "covid_calcs": getCovidCalculations
}

const availablePostRequests = {
    "register": register,
    "login": login
}

export const asyncGET = url => store.dispatch(availableGetRequests[url]());

export const asyncPOST = (url, data) => store.dispatch(availablePostRequests[url](data))