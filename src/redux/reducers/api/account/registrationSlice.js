import {createSlice} from "@reduxjs/toolkit";
import {
    forgotPasswordFailed,
    forgotPasswordSuccess,
    sentForgotPasswordRequest
} from "appRedux/reducers/api/account/forgotPasswordSlice.js";
import {sendPost} from "appRedux/util.js";

const initialState = {
    status: "INIT",
    errors: null
};

export const registrationSlice = createSlice({
    name: 'registration',
    initialState: initialState,
    reducers: {
        registrationRequested: (state) => {
            state.status = "SENT_REGISTRATION_REQUEST";
        },
        registrationSucceeded: (state) => {
            state.status = "REGISTRATION_COMPLETE";
            state.errors = null;
        },
        registrationFailed: (state, action) => {
            state.status = "ERROR";
            state.errors = action.payload;
        },
        resetRegistrationState: state => {
            state.status = "INIT";
            state.errors = null;
        }
    }
});

export const tryRegister = (email, password) => {
    return sendPost({
        target: 'register',
        onBefore: registrationRequested,
        onSuccess: registrationSucceeded,
        onFail: registrationFailed,
        body: {email: email, password: password}
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