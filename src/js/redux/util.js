import {getCookie} from "util/CookieManager";
import {showDialog} from "redux/reducers/application";

import axios from "axios";

const BASE_API_URL_DEVELOPMENT = "http://localhost:5000/api/";

const BASE_API_URL_PRODUCTION = "https://klkucharski-api.com/api/";

export const buildApiUrl = name => BASE_API_URL_DEVELOPMENT + name;

const sendPostWithAuthKey = async (url, body = {}) => {

    const authToken = getCookie("token");

    if (authToken === undefined) {
        return undefined;
    }

    return axios.post(url, body, { headers: { "Authorization": "Token " + authToken }});
};

const sendPostNoAuthKey = async (url, body = {}) => axios.post(url, body);

const sendPostAndParse = (requestFunc, name, onBefore, onSuccess, onFail, body = {}) => {
    return async dispatch => {
        try {
            dispatch(onBefore());
            parseResponse(dispatch, await requestFunc(buildApiUrl(name), body), onSuccess, onFail);
        }
        catch (e) {
            if (e.response.status === 401) {
                dispatch(onFail("Unauthorized"));
            }
            else {
                dispatch(showDialog({
                    type: "error",
                    title: "Server error",
                    content: "Server error: " + e.response.status,
                }));
                dispatch(onFail("Unknown error"));
            }
        }
    };
};

const parseResponse = (dispatch, response, onSuccess, onFail) => {
    if (response === undefined) {
        dispatch(onFail("No response"));
        return;
    }

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

export const sendAuthPostAndParse = (name, onBefore, onSuccess, onFail, body = {}) => {
    return sendPostAndParse(sendPostWithAuthKey, name, onBefore, onSuccess, onFail, body);
};

export const sendAnonymousPostAndParse = (name, onBefore, onSuccess, onFail, body = {}) => {
    return sendPostAndParse(sendPostNoAuthKey, name, onBefore, onSuccess, onFail, body);
};