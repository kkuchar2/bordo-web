import {createSlice} from "@reduxjs/toolkit"
import {sendAnonymousPostAndParse, sendAuthPostAndParse} from "../../../util.js"
import {getCookie, removeCookie, setCookie} from "util/CookieManager";

const initialState = {
    status: "LOGGED_OUT",
    errors: null,
    isUserLoggedIn: getCookie("token") !== undefined,
    email: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        sentLoginRequest: (state) => {
            state.status = "SENT_LOGIN_REQUEST";
            state.isUserLoggedIn = false;
            state.email = null;
        },
        sentAutologinRequest: (state) => {
            state.status = "SENT_AUTOLOGIN_REQUEST";
            state.isUserLoggedIn = false;
            state.errors = null;
            state.email = null;
        },
        loginSuccess: (state, action) => {
            state.errors = null;
            state.status = "LOGGED_IN";
            state.email = action.payload.user;
            state.isUserLoggedIn = true
            setCookie("token", action.payload.key);
        },
        autoLoginSuccess: (state, action) => {
            state.errors = null;
            state.status = "LOGGED_IN";
            state.email = action.payload.user;
            state.isUserLoggedIn = true
        },
        loginFailed: (state, action) => {
            state.status = "ERROR";
            state.isUserLoggedIn = false;
            state.errors = action.payload;
            state.email = null;
        },
        autoLoginFailed: (state) => {
            state.status = "LOGGED_OUT";
            state.isUserLoggedIn = false;
            state.errors = null;
            state.email = null;
        },
        sentLogoutRequest: (state) => {
            state.status = "SENT LOGOUT REQUEST";
            state.errors = null;
            state.email = null;
        },
        logoutSuccess: (state) => {
            state.status = "LOGGED_OUT";
            state.email = null;
            state.isUserLoggedIn = false;
            state.errors = null;
            removeCookie("token")
        },
        logoutFailed: (state, action) => {
            state.status = "ERROR";
            state.errors = action.payload;
            removeCookie("token")
        },
        sentDeleteAccountRequest: (state) => {
            state.status = "SENT_DELETE_ACCOUNT_REQUEST";
            state.errors = null;
        },
        deleteaccountSuccess: (state) => {
            state.status = "LOGGED_OUT";
            state.email = null;
            state.isUserLoggedIn = false;
            state.errors = null;
            removeCookie("token")
        },
        deleteAccountFailed: (state, action) => {
            state.errors = action.payload;
        },
        resetAuthState: (state) => {
            state.status = "LOGGED_OUT";
            state.errors = null;
            state.isUserLoggedIn = false;
            state.email = "";
        }
    }
})

export const tryLoginWithAuthKey = () =>
    sendAuthPostAndParse("session", sentAutologinRequest, autoLoginSuccess, autoLoginFailed);

export const tryLogin = (email, password) =>
    sendAnonymousPostAndParse("login", sentLoginRequest, loginSuccess, loginFailed, {email: email, password: password});

export const tryLogout = () =>
    sendAuthPostAndParse("logout", sentLogoutRequest, logoutSuccess, logoutFailed);

export const tryDeleteAccount = () =>
    sendAuthPostAndParse("deleteAccount", sentDeleteAccountRequest, deleteaccountSuccess, deleteAccountFailed);

export const selectorAuth = state => state.auth

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
    deleteaccountSuccess,
    deleteAccountFailed,
    resetAuthState
} = authSlice.actions
export default authSlice.reducer


