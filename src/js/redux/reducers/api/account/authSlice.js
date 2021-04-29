import {createSlice} from "@reduxjs/toolkit";
import {sendAnonymousPostAndParse, sendAuthPostAndParse} from "../../../util.js";
import {removeCookie, setCookie} from "util/CookieManager";

const initialState = {
    status: "LOGGED_OUT",
    isUserLoggedIn: false,
    hasPermission: false,
    errors: null,
    email: "",
};

const setState = (state, status, loggedIn, errors, email) => {
    state.status = status;
    state.isUserLoggedIn = loggedIn;
    state.errors = errors;
    state.email = email;
    state.hasPermission = false;
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        sentLoginRequest: (state) => setState(state, "SENT_LOGIN_REQUEST", false, null, null),
        sentAutologinRequest: (state) => setState(state, "SENT_AUTOLOGIN_REQUEST", false, null, null),
        loginSuccess: (state, action) => {
            setState(state, "LOGGED_IN", true, null, action.payload.user);
            setCookie("token", action.payload.key);
        },
        autoLoginSuccess: (state, action) => setState(state, "LOGGED_IN", true, null, action.payload.user),
        loginFailed: (state, action) => setState(state, "ERROR", false, action.payload, null),
        autoLoginFailed: (state, action) => setState(state, "LOGGED_OUT", false, action.payload, null),
        sentLogoutRequest: (state) => setState(state, "SENT_LOGOUT_REQUEST", state.isUserLoggedIn, null, state.email),
        logoutSuccess: (state) => {
            setState(state, "LOGGED_OUT", false, null, null);
            removeCookie("token");
        },
        logoutFailed: (state, action) => {
            setState(state, "ERROR", false, action.payload, null);
            removeCookie("token");
        },
        sentDeleteAccountRequest: (state) => setState(state, "SENT_DELETE_ACCOUNT_REQUEST", true, null, state.email),
        deleteAccountSuccess: (state) => setState(state, "LOGGED_OUT", false, null, null),
        deleteAccountFailed: (state, action) => setState(state, state.status, state.isUserLoggedIn, action.payload, state.email),
        sentAuthCheck: (state) => {
            setState(state, "SENT_AUTH_CHECK", state.isUserLoggedIn, state.errors, state.email);
            state.hasPermission = false;
        },
        authCheckSuccess: (state, action) => {
            setState(state, "AUTHENTICATED", true, null, state.email);
            state.hasPermission = true;
        },
        authCheckFail: (state) => setState(state, "LOGGED_OUT", false, null, null),
        removeErrors: (state) => setState(state, state.status, state.isUserLoggedIn, null, state.email),
        logUserOut: (state) => {
            removeCookie("token");
            setState(state, "LOGGED_OUT", false, null, null);
        },
    }
});

export const tryValidateAuthentication = () => sendAuthPostAndParse("is_authenticated", sentAuthCheck, authCheckSuccess, authCheckFail);

export const tryLoginWithAuthKey = () => sendAuthPostAndParse("session", sentAutologinRequest, autoLoginSuccess, autoLoginFailed);

export const tryLogin = (email, password) => sendAnonymousPostAndParse("login", sentLoginRequest, loginSuccess, loginFailed, {email: email, password: password});

export const tryLogout = () => sendAuthPostAndParse("logout", sentLogoutRequest, logoutSuccess, logoutFailed);

export const tryDeleteAccount = () => sendAuthPostAndParse("deleteAccount", sentDeleteAccountRequest, deleteAccountSuccess, deleteAccountFailed);

export const clearErrors = () => async dispatch => dispatch(removeErrors());

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
    sentAuthCheck,
    authCheckSuccess,
    authCheckFail,
    removeErrors,
    logUserOut
} = authSlice.actions;
export default authSlice.reducer;
