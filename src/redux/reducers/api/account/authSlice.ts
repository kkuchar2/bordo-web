import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API_URL, AppDispatch, RootState} from "appRedux/store";
import {customResponseParser, RequestState, RequestStatus, sendFilePost, sendPost} from "axios-client-wrapper";

export interface User {
    loggedIn: boolean,
    email: string,
    avatar: string
}

interface AuthSliceState {
    path: string,
    requestState: RequestState,
    errors: Array<string>,
    user: User
}

const defaultRequestState = {pending: false, status: RequestStatus.Unknown} as RequestState;
const emptyUser = {email: '', avatar: '', loggedIn: false} as User;

const setState = (state: any, action: PayloadAction<any>, user: User, requestState: RequestState) => {
    state.path = action.payload.path;
    state.requestState = requestState;
    state.errors = action.payload.errors;

    if (action.payload.data) {
        state.user = action.payload.data.user;
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState : {
        path: '',
        requestState: defaultRequestState,
        errors: [],
        user: {
            loggedIn: false,
            email: '',
            avatar: ''
        }
    },
    reducers: {
        sentLoginRequest: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: true, status: RequestStatus.Unknown };
            state.errors = action.payload.errors;
        },
        loginSuccess: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Success };
            state.errors = [];

            if (action.payload.data) {
                state.user = action.payload.data.user;
                state.user.loggedIn = true;
            }
        },
        loginFailed: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Failure };
            state.errors = action.payload.errors;
            state.user = emptyUser;
        },
        sentAutologinRequest: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: true, status: RequestStatus.Unknown };
            state.errors = action.payload.errors;
        },
        autoLoginSuccess: (state, action) => {
            state.requestState = {pending: false, status: RequestStatus.Success };
            state.errors = [];

            if (action.payload.data) {
                state.user = action.payload.data.user;
                state.user.loggedIn = true;
            }
        },
        autoLoginFailed: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Failure };
            state.errors = action.payload.errors;
            state.user = emptyUser;
        },
        sentGoogleLoginRequest: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: true, status: RequestStatus.Unknown };
            state.errors = action.payload.errors;
        },
        googleLoginRequestSuccess: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Success };
            state.errors = action.payload.errors;
            state.user = emptyUser;
        },
        googleLoginRequestFailure: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Failure };
            state.errors = action.payload.errors;
        },
        sentLogoutRequest: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: true, status: RequestStatus.Unknown };
            state.errors = action.payload.errors;
        },
        logoutSuccess: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Success };
            state.errors = [];
            state.user = emptyUser;
        },
        logoutFailed: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Failure };
            state.errors = action.payload.errors;
        },
        sentDeleteAccountRequest: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: true, status: RequestStatus.Unknown };
            state.errors = action.payload.errors;
        },
        deleteAccountSuccess: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Success };
            state.errors = [];
            state.user = emptyUser;
        },
        deleteAccountFailed: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Failure };
            state.errors = action.payload.errors;
        },

        sentChangeProfileImage: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: true, status: RequestStatus.Unknown };
            state.errors = action.payload.errors;
        },
        changeProfileImageSuccess: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Success };
            state.errors = [];
            state.user.avatar = action.payload.data.avatar;
        },
        changeProfileImageFailed: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: false, status: RequestStatus.Failure };
            state.errors = action.payload.errors;
            state.user = action.payload.user;
        },
        removeErrors: (state, action: PayloadAction) => {
            setState(state, action, state.user, state.requestState);
        },
    }
});

export const tryLoginWithGoogleCredentials = (accessToken: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'googleLogin',
        onBefore: sentGoogleLoginRequest,
        onSuccess: googleLoginRequestSuccess,
        onFail: googleLoginRequestFailure,
        responseParser: customResponseParser,
        body: {access_token: accessToken}
    });
};

export const tryAutoLogin = () => {
    return sendPost({
        apiUrl: API_URL,
        path: 'autoLogin',
        onBefore: sentAutologinRequest,
        onSuccess: autoLoginSuccess,
        onFail: autoLoginFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {}
    });
};

export const tryLogin = (user: string, password: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'login',
        onBefore: sentLoginRequest,
        onSuccess: loginSuccess,
        onFail: loginFailed,
        responseParser: customResponseParser,
        body: {email: user, password: password},
        withAuthentication: true
    });
};

export const tryLogout = () => {
    return sendPost({
        apiUrl: API_URL,
        path: 'logout',
        onBefore: sentLogoutRequest,
        onSuccess: logoutSuccess,
        onFail: logoutFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {},
    });
};

export const tryDeleteAccount = () => {
    return sendPost({
        apiUrl: API_URL,
        path: 'deleteAccount',
        onBefore: sentDeleteAccountRequest,
        onSuccess: deleteAccountSuccess,
        onFail: deleteAccountFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        body: {}
    });
};

export const tryChangeProfileImage = (file: File) => {
    return sendFilePost({
        apiUrl: API_URL,
        path: 'changeProfileImage',
        onBefore: sentChangeProfileImage,
        onSuccess: changeProfileImageSuccess,
        onFail: changeProfileImageFailed,
        responseParser: customResponseParser,
        onUploadProgress: e => {},
        file: file,
        withAuthentication: true
    });
};

export const clearAuthErrors = () => async (dispatch: AppDispatch) => dispatch(removeErrors());

export const selectorAuth = (state: RootState) => state.auth;

export const {
    sentLoginRequest,
    sentAutologinRequest,
    loginSuccess,
    autoLoginSuccess,
    loginFailed,
    autoLoginFailed,
    sentLogoutRequest,
    logoutSuccess,
    logoutFailed,
    sentDeleteAccountRequest,
    deleteAccountSuccess,
    deleteAccountFailed,
    removeErrors,
    sentGoogleLoginRequest,
    googleLoginRequestSuccess,
    googleLoginRequestFailure,
    sentChangeProfileImage,
    changeProfileImageSuccess,
    changeProfileImageFailed,
} = authSlice.actions;
export default authSlice.reducer;
