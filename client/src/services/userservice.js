import config from 'config';

import Cookies from "universal-cookie";

const cookies = new Cookies();

const LOGIN_URL = `${config.apiUrl}/login/`;
const REGISTER_URL = `${config.apiUrl}/register/`;
const CONFIRM_URL = `${config.apiUrl}/confirm/`;

export const userService = { login, register, confirmAccount };

function createErrorInfo(status, data) {
    let errorInfo = {};
    errorInfo.response_status = status;
    errorInfo.message = data;
    return errorInfo;
}

function createRequest(data) {
    return {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };
}

function handleError(data, url) {
    if (data instanceof TypeError) {
        return Promise.reject(createErrorInfo(-1, "Could not connect to: " + url));
    }

    return Promise.reject(data);
}

function callApi(url, data) {
    return fetch(url, createRequest(data));
}

function login(username, password) {
    return callApi(LOGIN_URL, {username, password})
        .then(handleResponse)
        .then(onLoginResponse)
        .catch(data => handleError(data, LOGIN_URL));

    function onLoginResponse(response) {
        console.log(response["key"]);
        cookies.set('access_token', response["key"], { path: '/',  secure: true,  httpOnly: true });
        return response;
    }
}

function register(email, username, password1, password2) {
    return callApi(REGISTER_URL, {email, username, password1, password2})
        .then(handleResponse)
        .catch(data => handleError(data, REGISTER_URL));
}

function confirmAccount(uid, token) {
    return callApi(CONFIRM_URL, {uid, token})
        .then(handleResponse)
        .catch(data => handleError(data, CONFIRM_URL));
}

function handleResponse(response) {
    return response.text().then(text => {

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
            }

            return Promise.reject(createErrorInfo(response.status, text));
        } else {
            const json = JSON.parse(text);
            const data = text && json;
            const response_status = json["status"];

            if (response_status === "error") {
                let errorInfo = createErrorInfo(response.status, JSON.parse(text));
                return Promise.reject(errorInfo);
            } else {
                return data;
            }
        }
    });
}