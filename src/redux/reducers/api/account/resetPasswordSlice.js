import {createSlice} from "@reduxjs/toolkit";
import {sendPost} from "appRedux/util.js";

const initialState = {
    requestPending: false,
    receivedResponse: false,
    errors: []
};

const setState = (state, errors, requestPending, receivedResponse) => {
    state.errors = errors;
    state.requestPending = requestPending;
    state.receivedResponse = receivedResponse;
};

export const resetPasswordSlice = createSlice({
    name: 'resetPassword',
    initialState: initialState,
    reducers: {
        sentResetPasswordRequest: state => setState(state, [], true, false),
        resetPasswordSuccess: state => setState(state, [], false, true),
        resetPasswordFailed: (state, action)  => setState(state, action.payload, false, true),
        resetPasswordResetState: state => setState(state, [], false, false),
    }
});

export const trySendResetPassword = (newPassword1, newPassword2, uid, token) => {
    return sendPost({
        endpointName: 'resetPasswordConfirm',
        onBefore: sentResetPasswordRequest,
        onSuccess: resetPasswordSuccess,
        onFail: resetPasswordFailed,
        body: {
            new_password1: newPassword1,
            new_password2: newPassword2,
            uid: uid,
            token: token
        }
    });
};

export const selectorResetPassword = state => state.resetPassword;

export const {
    sentResetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailed,
    resetPasswordResetState
} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;