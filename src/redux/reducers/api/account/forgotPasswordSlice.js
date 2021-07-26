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

export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: initialState,
    reducers: {
        sentForgotPasswordRequest: state => setState(state, [], true, false),
        forgotPasswordSuccess: state => setState(state, [], false, true),
        forgotPasswordFailed: (state, action) => setState(state, action.payload, false, true),
        forgotPasswordResetState: state => setState(state, [], false, false)
    }
});

export const trySendForgotPassword = (email) => {
    return sendPost({
        endpointName: 'forgotPassword',
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