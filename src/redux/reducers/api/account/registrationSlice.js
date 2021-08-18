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

export const registrationSlice = createSlice({
    name: 'registration',
    initialState: initialState,
    reducers: {
        registrationRequested: (state, action) => setState(state, action, true, false),
        registrationSucceeded: (state, action) => setState(state, action, false, true),
        registrationFailed: (state, action) => setState(state, action, false, true),
        resetRegistrationState: (state, action) => setState(state, action, false, false)
    }
});

export const tryRegister = (email, password) => {
    return sendPost({
        endpointName: 'register',
        onBefore: registrationRequested,
        onSuccess: registrationSucceeded,
        onFail: registrationFailed,
        body: {email: email, password: password},
        withCredentials: false
    });
};

export const tryResetRegistrationState = () => async dispatch => dispatch(resetRegistrationState());

export const selectorRegistration = state => state.registration;

export const {
    registrationRequested,
    registrationSucceeded,
    registrationFailed,
    resetRegistrationState
} = registrationSlice.actions;

export default registrationSlice.reducer;