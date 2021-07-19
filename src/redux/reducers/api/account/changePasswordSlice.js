import {createSlice} from "@reduxjs/toolkit";
import {sendPost} from "appRedux/util.js";

export const changePasswordSlice = createSlice({
    name: 'changePassword',
    initialState: {
        status: "INIT",
        data: null
    },
    reducers: {
        sentChangePasswordRequest: state => {
            state.status = "CHANGE_PASSWORD_REQUEST_SENT";
            state.data = null;
        },
        changePasswordSuccess: state => {
            state.status = "CHANGE_PASSWORD_EMAIL_SENT";
            state.data = null;
        },
        changePasswordFailed: (state, action) => {
            state.status = "CHANGE_PASSWORD_ERROR";
            state.data = action.payload;
        },
        changePasswordResetState: state => {
            state.status = "INIT";
            state.data = null;
        }
    }
});

export const trySendChangePassword = (password) => {
    return sendPost({
        target: 'changePassword',
        onBefore: sentChangePasswordRequest,
        onSuccess: changePasswordSuccess,
        onFail: changePasswordFailed,
        body: {password: password}
    });
};

export const tryResetChangePasswordState = () => async dispatch => dispatch(changePasswordResetState());

export const selectorChangePassword = state => state.changePassword;

export const {
    sentChangePasswordRequest,
    changePasswordSuccess,
    changePasswordFailed,
    changePasswordResetState
} = changePasswordSlice.actions;
export default changePasswordSlice.reducer;