import {getCookie} from "util/CookieManager.js";
import {showDialog} from "appRedux/reducers/application";

import axios from "axios";

const BASE_API_URL_DEVELOPMENT = "http://127.0.0.1:8001/api/";

const BASE_API_URL_PRODUCTION = "https://klkucharski-api.com/api/";

export const buildApiUrl = name => BASE_API_URL_DEVELOPMENT + name;

const sendPostWithCookies = async (url, body = {}) => {
    return axios.post(url, body, {withCredentials: true});
};

const sendPostAndParse = (requestFunc, name, onBefore, onSuccess, onFail, body = {}) => {
    return async dispatch => {
        try {
            dispatch(onBefore());
            //await new Promise(r => setTimeout(r, 1000));
            parseResponse(dispatch, await requestFunc(buildApiUrl(name), body), onSuccess, onFail);
        }
        catch (e) {
            if (e.message === 'Network Error'){
                dispatch(onFail("network_error"));
                return;
            }

            if (!e.response) {
                dispatch(onFail("unknown_error"));
            }

            if (e.response.status === 401) {
                dispatch(onFail("Unauthorized"));
            }
            else {
                dispatch(showDialog({
                    type: "error",
                    title: "Server error",
                    content: "Server error: " + e.response.status,
                }));
                dispatch(onFail("unknown_error"));
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
    const {target, onBefore, onSuccess, onFail, body = {}} = params;
    console.debug(`%c[POST]: /${target}, body: ${JSON.stringify(body)}`, "color: #ccff44");
    return sendPostAndParse(sendPostWithCookies, target, onBefore, onSuccess, onFail, body);
};