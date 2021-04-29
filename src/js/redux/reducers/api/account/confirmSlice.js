import {createSlice} from "@reduxjs/toolkit";
import {sendAnonymousPostAndParse} from "../../../util.js";

const initialState = {
    status: "INIT",
    errors: null
};

const setState = (state, status, errors) => {
    state.status = status;
    state.errors = errors;
};

export const confirmSlice = createSlice({
    name: 'confirmEmail',
    initialState: initialState,
    reducers: {
        accountConfirmationTokenSent: (state) => setState(state, "CONFIRMATION_TOKEN_SENT",  null),
        accountConfirmationSuccess: (state) => setState(state, "ACCOUNT_CONFIRMED",  null),
        accountConfirmationError: (state, action) => setState(state, "CONFIRMATION_ERROR",  action.payload),
        resetConfirmState: (state) => setState(state, "INIT",  null),
    }
})

export const tryConfirmAccount = (token) => sendAnonymousPostAndParse("confirm-email",
    accountConfirmationTokenSent, accountConfirmationSuccess, accountConfirmationError, {key: token});

export const selectorAccountConfirm = state => state.confirm

export const {
    accountConfirmationTokenSent,
    accountConfirmationSuccess,
    accountConfirmationError,
    resetConfirmState
} = confirmSlice.actions
export default confirmSlice.reducer