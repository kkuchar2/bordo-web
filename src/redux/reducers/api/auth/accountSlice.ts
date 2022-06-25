import {mapFrom} from "util/util";

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User} from "appRedux/reducers/api/auth/accountSlice.types";
import {RequestAction, requestReducer, requestSelectors} from "appRedux/reducers/tools";
import {RootState} from "appRedux/store";
import {useSelector} from "react-redux";
import {DefaultResponseArgs, RequestStatus, ResponseArgs} from "tools/client/client.types";

import {isSuccess, isWaiting} from "../../../../api/api_util";

import {IAuthSliceMap, IAuthSliceState, requestList} from "./accountSlice.requests";

const emptyUser = (recentlyLoggedOut: boolean = false): User => ({
    username: null,
    email: {},
    role: null,
    loggedIn: false,
    recentlyLoggedOut: recentlyLoggedOut,
    profile: {},
    social: {
        only_social: false,
        connections: [],
        supported_providers: [],
    },
}) as User;

const onLoginResponse = (state: IAuthSliceState, action: PayloadAction<ResponseArgs>) => {
    if (isSuccess(action.payload)) {
        state.user  = {...state.user, loggedIn: true, recentlyLoggedOut: false, ...action.payload.responseData};
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
    } as IAuthSliceState,
    reducers: {
        login: (state: IAuthSliceState, action: RequestAction) => {
            const tmpErrors = state.requests.login.info.errors;
            state.requests.login.info = action.payload.info;

            if (state.requests.login.info.status === RequestStatus.Waiting) {
                state.requests.login.info.errors = tmpErrors;
            }

            onLoginResponse(state, action);
        },
        registration: (state: IAuthSliceState, action: RequestAction) => {
            const tmpErrors = state.requests.registration.info.errors;
            state.requests.registration.info = action.payload.info;

            if (state.requests.registration.info.status === RequestStatus.Waiting) {
                state.requests.registration.info.errors = tmpErrors;
            }

            state.requests.registration = action.payload;
        },
        autoLogin: (state: IAuthSliceState, action: RequestAction) => {
            state.requests.autoLogin.info = action.payload.info;
            onLoginResponse(state, action);
        },
        logout: (state: IAuthSliceState, action: RequestAction) => {
            state.requests.logout = action.payload;

            if (action.payload.info.status === RequestStatus.Success) {
                state.user = emptyUser(true);
            }
        },
        googleLogin: (state: IAuthSliceState, action: RequestAction) => {
            state.requests.googleLogin = action.payload;
            onLoginResponse(state, action);
        },
        deleteAccount: (state: IAuthSliceState, action: RequestAction) => {
            state.requests.deleteAccount = action.payload;

            if (isSuccess(action.payload)) {
                state.user = emptyUser();
            }
        },
        disableAccount: (state: IAuthSliceState, action: RequestAction) => {
            state.requests.disableAccount = action.payload;

            if (isSuccess(action.payload)) {
                state.user = emptyUser();
            }
        },
        changeAvatar: (state: IAuthSliceState, action: RequestAction) => {
            state.requests.changeAvatar = action.payload;

            if (isSuccess(action.payload)) {
                state.user.profile.avatar = action.payload.responseData.avatar;
                state.user.profile.use_animated_avatar = action.payload.responseData.use_animated_avatar;
            }
        },
        changeAnimatedAvatar: (state: IAuthSliceState, action: RequestAction) => {
            state.requests.changeAnimatedAvatar = action.payload;

            if (isSuccess(action.payload)) {
                state.user.profile.animated_avatar = action.payload.responseData.animated_avatar;
                state.user.profile.use_animated_avatar = action.payload.responseData.use_animated_avatar;
            }
        },
        getDatabaseInfo: (state: IAuthSliceState, action: RequestAction) => {
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

        resetRequestState: (state: IAuthSliceState, action: PayloadAction<any>) => {
            state.requests[action.payload] = DefaultResponseArgs();
        }
    }
});

// TODO: Idea: keep track of all requests independently (just their state without response data)
// but pass in separate function for custom response handling

// Export all selectors for requests state
const accountRequestSelectors
    = requestSelectors<IAuthSliceMap>(state => state.accountSlice, requestList);

export const getSelector = (name: string) => {
    if (accountRequestSelectors[name]) {
        return accountRequestSelectors[name];
    }

    return (state: RootState) => {
        if (state.accountSlice[name]) {
            return state.accountSlice[name];
        }
        console.log(`No selector for ${name}`);
        return null;
    };
};

export const useAuthSelector = (subStateName: string) => {
    return useSelector(getSelector(subStateName));
};

// Custom selectors
export const getUserState = (state: RootState) => state.accountSlice.user;

export const getUserAvatar = (state: RootState) => {
    const profile = state.accountSlice.user.profile;

    if (profile.use_animated_avatar) {
        return profile.animated_avatar;
    }
    return profile.avatar;
};

export const { actions } = accountSlice;

export default accountSlice.reducer;
