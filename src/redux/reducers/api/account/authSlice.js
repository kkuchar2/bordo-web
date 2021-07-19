import {createSlice} from "@reduxjs/toolkit";
import Cookies from "universal-cookie/es6";
import {sendPost} from "appRedux/util.js";

const initialState = {
    requestPending: false,
    receivedResponse: false,
    loggedIn: false,
    errors: [],
    user: null,
};

const setState = (state, loggedIn, errors, user, requestPending, receivedResponse) => {
    state.loggedIn = loggedIn;
    state.errors = errors;
    state.user = user;
    state.requestPending = requestPending;
    state.receivedResponse = receivedResponse;
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        // password login
        sentLoginRequest: (state) => setState(state, false, state.errors, null, true, false),
        loginSuccess: (state, action) => setState(state, true, [], action.payload.user, false, true),
        loginFailed: (state, action) => setState(state, false, action.payload, null, false, true),

        // autologin
        sentAutologinRequest: (state) => setState(state, false, [], null, true, false),
        autoLoginSuccess: (state, action) => setState(state, true, [], action.payload.user, false, true),
        autoLoginFailed: (state, action) => setState(state, false, action.payload, null, false, true),

        // google login
        sentGoogleLoginRequest: (state) => setState(state, false, [], null, true, false),
        googleLoginRequestSuccess: (state, action) => setState(state, true, [], action.payload.user, false, true),
        googleLoginRequestFailure: (state, action) => setState(state, false, action.payload, null, false, true),

        // logout
        sentLogoutRequest: (state) => setState(state, state.loggedIn, [], state.user, true, false),
        logoutSuccess: (state) => setState(state, false, [], null, false, true),
        logoutFailed: (state, action) => setState(state, false, action.payload, null, false, true),

        // delete account
        sentDeleteAccountRequest: (state) => setState(state, true, [], state.user, true, false),
        deleteAccountSuccess: (state) => setState(state, false, [], null, false, true),
        deleteAccountFailed: (state, action) => setState(state, state.loggedIn, action.payload, state.user, false, true),

        removeErrors: (state) => setState(state, state.loggedIn, [], state.user, state.requestPending, state.receivedResponse),
        logUserOut: (state) => setState(state, false, [], null, false, false)
    }
});

export const tryLoginWithGoogleCredentials = (accessToken) => {
    return sendPost({
        target: 'googleLogin',
        onBefore: sentGoogleLoginRequest,
        onSuccess: googleLoginRequestSuccess,
        onFail: googleLoginRequestFailure,
        body: {access_token: accessToken}
    });
};

export const tryAutoLogin = () => {
    return sendPost({
        target: 'autoLogin',
        onBefore: sentAutologinRequest,
        onSuccess: autoLoginSuccess,
        onFail: autoLoginFailed,
        body: {}
    });
};

export const tryLogin = (user, password) => {
    return sendPost({
        target: 'login',
        onBefore: sentLoginRequest,
        onSuccess: loginSuccess,
        onFail: loginFailed,
        body: {email: user, password: password}
    });
};

export const tryLogout = () => {
    return sendPost({target: 'logout',
        onBefore: sentLogoutRequest,
        onSuccess: logoutSuccess,
        onFail: logoutFailed,
        body: {}
    });
};

export const tryDeleteAccount = () => {
    return sendPost({
        target: 'deleteAccount',
        onBefore: sentDeleteAccountRequest,
        onSuccess: deleteAccountSuccess,
        onFail: deleteAccountFailed,
        body: {}
    });
};

export const clearAuthErrors = () => async dispatch => dispatch(removeErrors());

export const selectorAuth = state => state.auth;

export const logOut = () => async dispatch => dispatch(logUserOut());

export const {
    sentLoginRequest,
    sentAutologinRequest,
    loginSuccess,
    autoLoginSuccess,
    loginFailed,
    autoLoginFailed,
    sentLogoutRequest,
    logoutSuccess,
    logoutFailed,
    sentDeleteAccountRequest,
    deleteAccountSuccess,
    deleteAccountFailed,
    removeErrors,
    logUserOut,
    sentGoogleLoginRequest,
    googleLoginRequestSuccess,
    googleLoginRequestFailure
} = authSlice.actions;
export default authSlice.reducer;
