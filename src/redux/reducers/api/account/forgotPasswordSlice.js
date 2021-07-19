import {createSlice} from "@reduxjs/toolkit";
import {
    accountConfirmationError,
    accountConfirmationSuccess,
    accountConfirmationTokenSent
} from "appRedux/reducers/api/account/confirmSlice.js";
import {sendPost} from "appRedux/util.js";

export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: {
        status: "INIT",
        data: null
    },
    reducers: {
        sentForgotPasswordRequest: state => {
            state.status = "FORGOT_PASSWORD_REQUEST_SENT";
            state.data = null;
        },
        forgotPasswordSuccess: state => {
            state.status = "FORGOT_PASSWORD_EMAIL_SENT";
            state.data = null;
        },
        forgotPasswordFailed: (state, action) => {
            state.status = "FORGOT_PASSWORD_ERROR";
            state.data = action.payload;
        },
        forgotPasswordResetState: state => {
            state.status = "INIT";
            state.data = null;
        }
    }
});

export const trySendResetPassword = (email) => {
    return sendPost({
        target: 'forgotPassword',
        onBefore: sentForgotPasswordRequest,
        onSuccess: forgotPasswordSuccess,
        onFail: forgotPasswordFailed,
        body: {email: email}
    });
};

export const tryResetForgotPasswordState = () => async dispatch => dispatch(forgotPasswordResetState());

export const selectorForgotPassword = state => state.forgotPassword;

export const {
    sentForgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailed,
    forgotPasswordResetState
} = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;