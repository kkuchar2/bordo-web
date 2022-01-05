import {createSlice} from "@reduxjs/toolkit";
import {API_URL, RootState} from "appRedux/store";
import {customResponseParser, RequestState, RequestStatus, sendPost} from "axios-client-wrapper";

export interface RegistrationSliceState {
    path: string,
    requestState: RequestState,
    errors: Array<string>
}

const defaultRequestState = {pending: false, status: RequestStatus.Unknown} as RequestState;

const registrationSlice = createSlice({
    name: 'registration',
    initialState: {
        path: '',
        requestState: defaultRequestState,
        errors: [],
    } as RegistrationSliceState,
    reducers: {
        sentRegistrationRequest: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: true, status: RequestStatus.Waiting };
        },
        registrationRequestSuccess: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Success };
            state.errors = [];
        },
        registrationRequestFailed: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Failure };
            state.errors = action.payload.errors;
        },
    }
});

export const tryRegister = (email: string, password: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'account/register',
        onBefore: sentRegistrationRequest,
        onSuccess: registrationRequestSuccess,
        onFail: registrationRequestFailed,
        responseParser: customResponseParser,
        withAuthentication: false,
        body: {
            email: email,
            password: password
        }
    });
};

export const selectorRegistration = (state: RootState) => state.registration;

export const {
    sentRegistrationRequest,
    registrationRequestSuccess,
    registrationRequestFailed,
} = registrationSlice.actions;

export default registrationSlice.reducer;