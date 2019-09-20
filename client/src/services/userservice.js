import config from 'config';

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const userService = {
    login,
    register,
    confirmAccount
};

function createErrorInfo(status, data) {
    let errorInfo = {};
    errorInfo.response_status = status;
    errorInfo.message = data;
    return errorInfo;
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password})
    };

    return fetch(`${config.apiUrl}/login/`, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log(response["key"]);
            cookies.set('access_token', response["key"], { path: '/',  secure: true,  httpOnly: true });
            return response;
        })
        .catch((data) => {
            if (data instanceof TypeError) {
                return Promise.reject(createErrorInfo(-1, "Could not connect to: " + `${config.apiUrl}/login/`));
            }

            return Promise.reject(data);
        });
}

function register(email, username, password1, password2) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, username, password1, password2})
    };

    return fetch(`${config.apiUrl}/register/`, requestOptions)
        .then(handleResponse)
        .catch((data) => {
            if (data instanceof TypeError) {
                return Promise.reject(createErrorInfo(-1, "Could not connect to: " + `${config.apiUrl}/register/`));
            }

            return Promise.reject(data);
        });
}

function confirmAccount(uid, token) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({uid, token})
    };

    console.log("Request options:");
    console.log(requestOptions);

    return fetch(`${config.apiUrl}/confirm/`, requestOptions)
        .then(handleResponse)
        .then(response => {
            console.log(response);
            return response;
        })
        .catch((data) => {
            if (data instanceof TypeError) {
                return Promise.reject(createErrorInfo(-1, "Could not connect to: " + `${config.apiUrl}/login/`));
            }

            return Promise.reject(data);
        });
}

function handleResponse(response) {
    return response.text().then(text => {

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
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