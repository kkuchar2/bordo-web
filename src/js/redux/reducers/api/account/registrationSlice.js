import {createSlice} from "@reduxjs/toolkit";
import {sendAnonymousPostAndParse} from "../../../util.js";

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
        reset: state => {
            state.status = "INIT";
            state.errors = null;
        }
    }
});

export const tryRegister = (email, password) =>
    sendAnonymousPostAndParse("register",
        registrationRequested,
        registrationSucceeded,
        registrationFailed,
        {email: email, password: password});

export const selectorRegistration = state => state.registration;

export const {
    registrationRequested,
    registrationSucceeded,
    registrationFailed,
    reset
} = registrationSlice.actions;

export default registrationSlice.reducer;