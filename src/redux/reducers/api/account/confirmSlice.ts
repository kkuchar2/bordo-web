import {createSlice} from "@reduxjs/toolkit";
import {API_URL, RootState} from "appRedux/store";
import {customResponseParser, sendPost} from "axios-client-wrapper";

const initialState = {
    status: "INIT",
    errors: null
};

const setState = (state: any, status: string, errors: any) => {
    state.status = status;
    state.errors = errors;
};

export const confirmSlice = createSlice({
    name: 'confirmEmail',
    initialState: initialState,
    reducers: {
        accountConfirmationTokenSent: (state) => setState(state, "CONFIRMATION_TOKEN_SENT", null),
        accountConfirmationSuccess: (state) => setState(state, "ACCOUNT_CONFIRMED", null),
        accountConfirmationError: (state, action) => setState(state, "CONFIRMATION_ERROR", action.payload),
        resetConfirmState: (state) => setState(state, "INIT", null),
    }
});

export const tryConfirmAccount = (token: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'confirm-email',
        onBefore: accountConfirmationTokenSent,
        onSuccess: accountConfirmationSuccess,
        onFail: accountConfirmationError,
        responseParser: customResponseParser,
        body: {key: token}
    });
};

export const selectorAccountConfirm = (state: RootState) => state.confirm;

export const {
    accountConfirmationTokenSent,
    accountConfirmationSuccess,
    accountConfirmationError
} = confirmSlice.actions;
export default confirmSlice.reducer;