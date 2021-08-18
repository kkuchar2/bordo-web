import {createSlice} from "@reduxjs/toolkit";
import {sendPost} from "appRedux/util.js";

const initialState = {
    path: null,
    requestSent: false,
    responseReceived: false,
    errors: []
};

const setState = (state, action, requestSent, responseReceived) => {
    const {errors = [], path = 'default'} = action.payload ? action.payload : {};

    state.errors = errors;
    state.path = path;
    state.requestSent = requestSent;
    state.responseReceived = responseReceived;
};

export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState: initialState,
    reducers: {
        sentForgotPasswordRequest: (state, action) => setState(state, action, true, false),
        forgotPasswordSuccess: (state, action) => setState(state, action, false, true),
        forgotPasswordFailed: (state, action) => setState(state, action, false, true),
        forgotPasswordResetState: (state, action) => setState(state, action, false, false)
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