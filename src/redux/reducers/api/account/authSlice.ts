import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {API_URL, AppDispatch, RootState} from "appRedux/store";
import {customResponseParser, RequestState, RequestStatus, sendFilePost, sendPost, sendGet} from "axios-client-wrapper";

export interface User {
    loggedIn: boolean,
    email: string,
    avatar: string,
    isVerified: boolean
}

export interface AuthSliceState {
    path: string,
    requestState: RequestState,
    errors: Array<string>,
    user: User
}

const defaultRequestState = {pending: false, status: RequestStatus.Unknown} as RequestState;
const emptyUser = {email: '', avatar: '', loggedIn: false, isVerified: false} as User;

const setState = (state: any, action: PayloadAction<any>, user: User, requestState: RequestState) => {
    state.path = action.payload.path;
    state.requestState = requestState;
    state.errors = action.payload.errors;

    if (action.payload.data) {
        state.user = action.payload.data.user;
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        path: '',
        requestState: defaultRequestState,
        errors: [],
        user: {
            loggedIn: false,
            email: '',
            avatar: '',
            isVerified: false
        }
    } as AuthSliceState,
    reducers: {
        sentLoginRequest: (state, action) => {
            state.path = action.payload.path;
            state.requestState = {pending: true, status: RequestStatus.Waiting };
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
            state.requestState = {pending: true, status: RequestStatus.Waiting };
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
            state.requestState = {pending: true, status: RequestStatus.Waiting };
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
            state.requestState = {pending: true, status: RequestStatus.Waiting };
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
            state.requestState = {pending: true, status: RequestStatus.Waiting };
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
            state.requestState = {pending: true, status: RequestStatus.Waiting };
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

        updateUser: (state, action: any) => {
            console.log('Updating user:');
            console.log(action);
        },

        removeErrors: (state, action: PayloadAction) => {
            setState(state, action, state.user, state.requestState);
        },
    },
});

export const tryLoginWithGoogleCredentials = (accessToken: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'account/googleLogin',
        onBefore: sentGoogleLoginRequest,
        onSuccess: googleLoginRequestSuccess,
        onFail: googleLoginRequestFailure,
        responseParser: customResponseParser,
        body: {access_token: accessToken}
    });
};

export const tryAutoLogin = () => {
    return sendGet({
        apiUrl: API_URL,
        path: 'account/autoLogin',
        onBefore: sentAutologinRequest,
        onSuccess: autoLoginSuccess,
        onFail: autoLoginFailed,
        responseParser: customResponseParser,
        withAuthentication: true,
        params: {}
    });
};

export const tryLogin = (user: string, password: string) => {
    return sendPost({
        apiUrl: API_URL,
        path: 'account/login',
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
        path: 'account/logout',
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
        path: 'account/delete',
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
        path: 'account/changeProfileImage',
        onBefore: sentChangeProfileImage,
        onSuccess: changeProfileImageSuccess,
        onFail: changeProfileImageFailed,
        responseParser: customResponseParser,
        onUploadProgress: e => {},
        file: file,
        withAuthentication: true
    });
};

export const updateUserState = (user: User) => async (dispatch: AppDispatch) => dispatch(updateUser(user));

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
    updateUser
} = authSlice.actions;
export default authSlice.reducer;