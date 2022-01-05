import {createSlice} from "@reduxjs/toolkit";
import {API_URL, RootState} from "appRedux/store";
import {customResponseParser, sendPost} from "axios-client-wrapper";

const initialState = {
    requestPending: false,
    receivedResponse: false,
    errors: []
};

const setState = (state: any, errors: Array<any>, requestPending: boolean, receivedResponse: boolean) => {
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
    }
});

export const trySendResetPassword = (newPassword1: string, newPassword2: string, uid: string, token: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'resetPasswordConfirm',
        onBefore: sentResetPasswordRequest,
        onSuccess: resetPasswordSuccess,
        onFail: resetPasswordFailed,
        responseParser: customResponseParser,
        body: {
            new_password1: newPassword1,
            new_password2: newPassword2,
            uid: uid,
            token: token
        }
    });
};

export const selectorResetPassword = (state: RootState) => state.resetPassword;

export const {
    sentResetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFailed,
} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;