import {showDialog} from "appRedux/reducers/application";

import axios from "axios";
import Cookies from "universal-cookie/es6";
import {createNetworkError} from "util/api_util.js";

const BASE_API_URL_DEVELOPMENT = "http://127.0.0.1:8001/api/";

const BASE_API_URL_PRODUCTION = "https://klkucharski-api.com/api/";

export const buildApiUrl = name => BASE_API_URL_DEVELOPMENT + name;

const sendPostWithCookies = async (url, body = {}) => {
    console.debug(`%c[POST]: ${url}, body: ${JSON.stringify(body)}`, "color: #ccff44");

    return axios.post(url, body, {
        withCredentials: true,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFTOKEN': new Cookies().get('csrftoken')
        }
    });
};

const sendPostAndParse = (requestFunc, endpointName, onBefore, onSuccess, onFail, body = {}) => {
    return async dispatch => {
        try {
            dispatch(onBefore());
            //await new Promise(r => setTimeout(r, 1000));
            parseResponse(dispatch, await requestFunc(buildApiUrl(endpointName), body), onSuccess, onFail);
        }
        catch (e) {
            if (e.message === 'Network Error') {
                dispatch(onFail(createNetworkError(endpointName)));
                return;
            }

            if (!e.response) {
                dispatch(onFail({ "any": ["unknown_error"] }));
            }

            if (e.response.status === 401) {
                dispatch(onFail({ "any": ["unauthorized"] }));
            }
            else {
                dispatch(onFail({ "any": ["unknown_error"] }));
            }
        }
    };
};

const parseResponse = (dispatch, response, onSuccess, onFail) => {
    if (response === undefined) {
        dispatch(onFail("No response"));
        return;
    }

    console.log(`%c-------------- Response for: ${response.config.url} --------------------`, "color: #ccff44");
    console.log(response); // undefined
    console.log(`%c-------------------------------------------------------------------------------------------`, "color: #ccff44");

    const responseData = response.data;

    if (responseData === undefined) {
        dispatch(onFail("No response data"));
        return;
    }

    const status = responseData.status;

    if (status === undefined) {
        dispatch(onFail("No response status present"));
        return;
    }

    const message = responseData.data;

    if (status === 'success') {
        dispatch(onSuccess(message));
    }
    else {
        dispatch(onFail(message));
    }
};

export const sendPost = (params) => {
    const {endpointName, onBefore, onSuccess, onFail, body = {}} = params;
    return sendPostAndParse(sendPostWithCookies, endpointName, onBefore, onSuccess, onFail, body);
};