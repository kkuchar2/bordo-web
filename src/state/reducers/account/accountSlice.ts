import {mapFrom} from "util/util";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {requestList} from "state/reducers/account/constants";
import {DefaultResponseArgs, RequestStatus, ResponseArgs} from "tools/client/client.types";

import {isFailure, isSuccess, isWaiting} from "../../../api/api_util";
import {RequestAction, requestReducer} from "../tools";

import {AccountSliceState} from "./accountSlice.requests";
import {User} from "./accountSlice.types";

const emptyUser = (recentlyLoggedOut: boolean = false): User => ({
    username: null,
    email: {},
    role: null,
    loggedIn: false,
    lastAutologinFailed: false,
    recentlyLoggedOut: recentlyLoggedOut,
    profile: {},
    social: {
        only_social: false,
        connections: [],
        supported_providers: [],
    },
}) as User;

const onLoginResponse = (state: AccountSliceState, action: PayloadAction<ResponseArgs>) => {
    if (isSuccess(action.payload)) {
        state.user = { ...state.user, loggedIn: true, recentlyLoggedOut: false, ...action.payload.responseData };
    }
    else if (isWaiting(action.payload)) {
        state.user = emptyUser();
    }
};

export const accountSlice = createSlice({
    name: "accountSlice",
    initialState: {
        requests: mapFrom(requestList, DefaultResponseArgs()),
        user: emptyUser(),
        databaseInfo: {}
    } as AccountSliceState,
    reducers: {
        login: (state: AccountSliceState, action: RequestAction) => {
            const tmpErrors = state.requests.login.info.errors;
            state.requests.login.info = action.payload.info;

            if (state.requests.login.info.status === RequestStatus.Waiting) {
                state.requests.login.info.errors = tmpErrors;
            }

            onLoginResponse(state, action);
        },
        registration: (state: AccountSliceState, action: RequestAction) => {
            const tmpErrors = state.requests.registration.info.errors;
            state.requests.registration.info = action.payload.info;

            if (state.requests.registration.info.status === RequestStatus.Waiting) {
                state.requests.registration.info.errors = tmpErrors;
            }

            state.requests.registration = action.payload;
        },
        autoLogin: (state: AccountSliceState, action: RequestAction) => {
            state.requests.autoLogin.info = action.payload.info;
            onLoginResponse(state, action);

            if (isFailure(action.payload)) {
                state.user.lastAutologinFailed = true;
            }
            else if (isSuccess(action.payload)) {
                state.user.lastAutologinFailed = false;
            }
        },
        logout: (state: AccountSliceState, action: RequestAction) => {
            state.requests.logout = action.payload;

            if (action.payload.info.status === RequestStatus.Success) {
                state.user = emptyUser(true);
            }
        },
        googleLogin: (state: AccountSliceState, action: RequestAction) => {
            state.requests.googleLogin = action.payload;
            onLoginResponse(state, action);
        },
        deleteAccount: (state: AccountSliceState, action: RequestAction) => {
            state.requests.deleteAccount = action.payload;

            if (isSuccess(action.payload)) {
                state.user = emptyUser();
            }
        },
        disableAccount: (state: AccountSliceState, action: RequestAction) => {
            state.requests.disableAccount = action.payload;

            if (isSuccess(action.payload)) {
                state.user = emptyUser();
            }
        },
        changeAvatar: (state: AccountSliceState, action: RequestAction) => {
            state.requests.changeAvatar = action.payload;

            if (isSuccess(action.payload)) {
                state.user.profile.avatar = action.payload.responseData.avatar;
                state.user.profile.use_animated_avatar = action.payload.responseData.use_animated_avatar;
            }
        },
        changeAnimatedAvatar: (state: AccountSliceState, action: RequestAction) => {
            state.requests.changeAnimatedAvatar = action.payload;

            if (isSuccess(action.payload)) {
                state.user.profile.animated_avatar = action.payload.responseData.animated_avatar;
                state.user.profile.use_animated_avatar = action.payload.responseData.use_animated_avatar;
            }
        },
        getDatabaseInfo: (state: AccountSliceState, action: RequestAction) => {
            if (isSuccess(action.payload)) {
                state.databaseInfo = action.payload.responseData;
            }
        },
        changeEmailAddress: requestReducer("changeEmailAddress"),
        changeUsername: requestReducer("changeUsername"),
        changePassword: requestReducer("changePassword"),
        forgotPassword: requestReducer("forgotPassword"),
        resetPassword: requestReducer("resetPassword"),
        askSetupPassword: requestReducer("askSetupPassword"),
        disconnectFromGoogle: requestReducer("disconnectFromGoogle"),
        confirmRegistration: requestReducer("accountConfirmation"),
        createNewPassword: requestReducer("createNewPassword"),
        accountVerificationEmail: requestReducer("accountVerificationEmail"),

        resetRequestState: (state: AccountSliceState, action: PayloadAction<any>) => {
            state.requests[action.payload] = DefaultResponseArgs();
        }
    }
});

export const { actions: accountActions } = accountSlice;

export default accountSlice.reducer;
