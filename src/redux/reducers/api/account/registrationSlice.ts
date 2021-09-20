import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API_URL, AppDispatch, RootState} from "appRedux/store";
import {customResponseParser, sendPost} from "axios-client-wrapper";

const initialState = {
    path: null,
    requestSent: false,
    responseReceived: false,
    errors: []
};

const setState = (state: any, action: PayloadAction<any>, requestSent: boolean, responseReceived: boolean) => {
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
        resetRegistrationState: (state, action: PayloadAction) => setState(state, action, false, false)
    }
});

export const tryRegister = (email: string, password: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'register',
        onBefore: registrationRequested,
        onSuccess: registrationSucceeded,
        onFail: registrationFailed,
        responseParser: customResponseParser,
        withAuthentication: false,
        body: {
            email: email,
            password: password
        }
    });
};

export const tryResetRegistrationState = () => async (dispatch: AppDispatch) => dispatch(resetRegistrationState());

export const selectorRegistration = (state: RootState) => state.registration;

export const {
    registrationRequested,
    registrationSucceeded,
    registrationFailed,
    resetRegistrationState
} = registrationSlice.actions;

export default registrationSlice.reducer;