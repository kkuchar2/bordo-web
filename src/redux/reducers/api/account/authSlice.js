import {createSlice} from "@reduxjs/toolkit";
import {sendFilePost, sendPost} from "appRedux/util.js";

const initialState = {
    path: null,
    requestSent: false,
    responseReceived: false,
    loggedIn: false,
    errors: [],
    user: null,
};

const setState = (state, action, loggedIn, user, requestSent, responseReceived) => {

    const {errors = state.errors, path = 'default'} = action.payload ? action.payload : {};

    state.loggedIn = loggedIn;
    state.errors = errors;
    state.user = user;
    state.path = path;
    state.requestSent = requestSent;
    state.responseReceived = responseReceived;
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        // Request: password login
        sentLoginRequest: (state, action) => setState(state, action, false, null, true, false),
        loginSuccess: (state, action) => {

            setState(state, action, true, action.payload.user, false, true);
        },
        loginFailed: (state, action) => setState(state, action, false, null, false, true),

        // Request: autologin
        sentAutologinRequest: (state, action) => setState(state, action, false, null, true, false),
        autoLoginSuccess: (state, action) => setState(state, action, true, action.payload.user, false, true),
        autoLoginFailed: (state, action) => setState(state, action, false, null, false, true),

        // Request: google login
        sentGoogleLoginRequest: (state, action) => setState(state, action, false, null, true, false),
        googleLoginRequestSuccess: (state, action) => setState(state, action, true, action.payload.user, false, true),
        googleLoginRequestFailure: (state, action) => setState(state, action, false, null, false, true),

        // Request: logout
        sentLogoutRequest: (state, action) => setState(state, action, state.loggedIn, state.user, true, false),
        logoutSuccess: (state, action) => setState(state, action, false, null, false, true),
        logoutFailed: (state, action) => setState(state, action, false, null, false, true),

        // Request: delete account
        sentDeleteAccountRequest: (state, action) => setState(state, action, true, state.user, true, false),
        deleteAccountSuccess: (state, action) => setState(state, action, false, null, false, true),
        deleteAccountFailed: (state, action) => setState(state, action, state.loggedIn, state.user, false, true),

        removeErrors: (state, action) => setState(state, action, state.loggedIn, state.user, state.requestSent, state.responseReceived),
        logUserOut: (state, action) => setState(state, action, false, null, false, false),

        sentChangeProfileImage: (state, action) => setState(state, action, state.loggedIn, state.user, true, false),
        changeProfileImageSuccess: (state, action) => setState(state, action, state.loggedIn, action.payload.user, false, true),
        changeProfileImageFailed: (state, action) => setState(state, action, state.loggedIn, state.user, true)
    }
});

export const tryLoginWithGoogleCredentials = (accessToken) => {
    return sendPost({
        endpointName: 'googleLogin',
        onBefore: sentGoogleLoginRequest,
        onSuccess: googleLoginRequestSuccess,
        onFail: googleLoginRequestFailure,
        body: {access_token: accessToken}
    });
};

export const tryAutoLogin = () => {
    return sendPost({
        endpointName: 'autoLogin',
        onBefore: sentAutologinRequest,
        onSuccess: autoLoginSuccess,
        onFail: autoLoginFailed,
        body: {}
    });
};

export const tryLogin = (user, password) => {
    return sendPost({
        endpointName: 'login',
        onBefore: sentLoginRequest,
        onSuccess: loginSuccess,
        onFail: loginFailed,
        body: {email: user, password: password},
        withCredentials: false
    });
};

export const tryLogout = () => {
    return sendPost({
        endpointName: 'logout',
        onBefore: sentLogoutRequest,
        onSuccess: logoutSuccess,
        onFail: logoutFailed,
        body: {}
    });
};

export const tryDeleteAccount = () => {
    return sendPost({
        endpointName: 'deleteAccount',
        onBefore: sentDeleteAccountRequest,
        onSuccess: deleteAccountSuccess,
        onFail: deleteAccountFailed,
        body: {}
    });
};

export const tryChangeProfileImage = (file) => {
    return sendFilePost({
        endpointName: 'changeProfileImage',
        onBefore: sentChangeProfileImage,
        onSuccess: changeProfileImageSuccess,
        onFail: changeProfileImageFailed,
        file: file
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
    googleLoginRequestFailure,
    sentChangeProfileImage,
    changeProfileImageSuccess,
    changeProfileImageFailed,
} = authSlice.actions;
export default authSlice.reducer;
