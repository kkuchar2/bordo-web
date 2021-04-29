import {createSlice} from "@reduxjs/toolkit";
import {sendAnonymousPostAndParse} from "../../../util";

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: {
        status: "INIT",
        data: null
    },
    reducers: {
        sentResetPasswordRequest: state => {
            state.status = "RESET_PASSWORD_REQUEST_SENT";
            state.data = null;
        },
        resetPasswordSuccess: state => {
            state.status = "RESET_PASSWORD_EMAIL_SENT";
            state.data = null;
        },
        resetPasswordFailed: (state, action) => {
            state.status = "RESET_PASSWORD_ERROR";
            state.data = action.payload;
        },
        resetPasswordResetState: state => {
            state.status = "INIT";
            state.data = null;
        }
    }
});

export const trySendResetPassword = (email) =>
    sendAnonymousPostAndParse("resetPassword", sentResetPasswordRequest, resetPasswordSuccess, resetPasswordFailed, {email: email});

export const selectorResetPassword = state => state.confirm;

export const {
    sentResetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailed,
    resetPasswordResetState
} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;