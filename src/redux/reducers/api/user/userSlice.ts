import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState} from "appRedux/store";
import {Dispatch} from "redux";
import {DefaultResponseArgs, RequestStatus, ResponseArgs} from "tools/client/client.types";

import {isSuccess, isWaiting} from "../../../../api/api_util";

import {IUserSliceState, User} from "./userSlice.types";

const emptyUser = {
    loggedIn: false,
    role: null,
    email: {},
    profile: {}
} as User;

const onLoginResponse = (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
    if (isSuccess(action.payload)) {
        state.user.email = action.payload.responseData.user.email;
        state.user.username = action.payload.responseData.user.username;
        state.user.profile.avatar = action.payload.responseData.user.profile.avatar;
        state.user.profile.animatedAvatar = action.payload.responseData.user.profile.animated_avatar;
        state.user.profile.useAnimatedAvatar = action.payload.responseData.user.profile.use_animated_avatar;
        state.user.role = action.payload.responseData.user.role;
        state.user.loggedIn = true;
    }
    else if (isWaiting(action.payload)) {
        state.user = emptyUser;
    }
};

const onAutoLoginResponse = (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
    if (isSuccess(action.payload)) {
        state.user.email = action.payload.responseData.email;
        state.user.username = action.payload.responseData.username;
        state.user.profile.avatar = action.payload.responseData.profile.avatar;
        state.user.profile.animatedAvatar = action.payload.responseData.profile.animated_avatar;
        state.user.profile.useAnimatedAvatar = action.payload.responseData.profile.use_animated_avatar;
        state.user.loggedIn = true;
        state.user.role = action.payload.responseData.role;
    }
    else if (isWaiting(action.payload)) {
        state.user = emptyUser;
    }
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        requests: {
            login: DefaultResponseArgs(),
            registration: DefaultResponseArgs(),
            autoLogin: DefaultResponseArgs(),
            googleLogin: DefaultResponseArgs(),
            logout: DefaultResponseArgs(),
            deleteAccount: DefaultResponseArgs(),
            disableAccount: DefaultResponseArgs(),
            changeEmailAddress: DefaultResponseArgs(),
            changeUsername: DefaultResponseArgs(),
            changeFirstName: DefaultResponseArgs(),
            changePassword: DefaultResponseArgs(),
            changeAvatar: DefaultResponseArgs(),
            changeAnimatedAvatar: DefaultResponseArgs(),
            forgotPassword: DefaultResponseArgs(),
            resetPassword: DefaultResponseArgs(),
            accountConfirmation: DefaultResponseArgs(),
            accountVerificationEmail: DefaultResponseArgs(),
            testAuth: DefaultResponseArgs(),
        },
        user: emptyUser
    } as IUserSliceState,
    reducers: {
        login: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.login.info = action.payload.info;
            onLoginResponse(state, action);
        },
        registration: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.registration = action.payload;
        },
        autoLogin: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.autoLogin.info = action.payload.info;
            onAutoLoginResponse(state, action);
        },
        logout: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.logout = action.payload;

            if (action.payload.info.status === RequestStatus.Success) {
                state.user = emptyUser;
            }
        },
        googleLogin: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.googleLogin = action.payload;
            onLoginResponse(state, action);
        },
        deleteAccount: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.deleteAccount = action.payload;

            if (isSuccess(action.payload)) {
                console.log('Deleted account, setting user to empty');
                state.user = emptyUser;
            }
        },
        disableAccount: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.disableAccount = action.payload;

            if (isSuccess(action.payload)) {
                console.log('Disabled account, setting user to empty');
                state.user = emptyUser;
            }
        },
        changeEmailAddress: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.changeEmailAddress = action.payload;
        },
        changeUsername: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.changeUsername = action.payload;
        },
        changeFirstName: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.changeFirstName = action.payload;
        },
        forgotPassword: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.forgotPassword = action.payload;
        },
        resetPassword: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.resetPassword = action.payload;
        },
        changePassword: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.changePassword = action.payload;
        },
        confirmRegistration: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.accountConfirmation = action.payload;
        },
        changeAvatar: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.changeAvatar = action.payload;

            if (isSuccess(action.payload)) {
                state.user.profile.avatar = action.payload.responseData.avatar;
                state.user.profile.useAnimatedAvatar = action.payload.responseData.use_animated_avatar;
            }
        },
        accountVerificationEmail: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.accountVerificationEmail = action.payload;
        },
        changeAnimatedAvatar: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.changeAnimatedAvatar = action.payload;

            if (isSuccess(action.payload)) {
                state.user.profile.animatedAvatar = action.payload.responseData.animated_avatar;
                state.user.profile.useAnimatedAvatar = action.payload.responseData.use_animated_avatar;
            }
        },
        testAuth: (state: IUserSliceState, action: PayloadAction<ResponseArgs>) => {
            state.requests.testAuth = action.payload;
        },
        resetRequestState: (state: IUserSliceState, action: PayloadAction<any>) => {
            state.requests[action.payload] = DefaultResponseArgs();
        }
    }
});

export const getUserState = (state: RootState) => state.userSlice.user;

export const getUserAvatar = (state: RootState) => {
    const profile = state.userSlice.user.profile;

    if (profile.useAnimatedAvatar) {
        return profile.animatedAvatar;
    }
    return profile.avatar;
};

export const getAutoLoginState = (state: RootState) => state.userSlice.requests.autoLogin;

export const getLoginState = (state: RootState) => state.userSlice.requests.login;

export const getRegistrationState = (state: RootState) => state.userSlice.requests.registration;

export const getConfirmationState = (state: RootState) => state.userSlice.requests.accountConfirmation;

export const getChangeAvatarState = (state: RootState) => state.userSlice.requests.changeAvatar;

export const getChangeAnimatedAvatarState = (state: RootState) => state.userSlice.requests.changeAnimatedAvatar;

export const getChangeEmailAddressState = (state: RootState) => state.userSlice.requests.changeEmailAddress;

export const getSendConfirmationEmailState = (state: RootState) => state.userSlice.requests.accountVerificationEmail;

export const getChangeUsernameState = (state: RootState) => state.userSlice.requests.changeUsername;

export const getDeleteAccountState = (state: RootState) => state.userSlice.requests.deleteAccount;

export const getDisableAccountState = (state: RootState) => state.userSlice.requests.disableAccount;

export const getForgotPasswordState = (state: RootState) => state.userSlice.requests.forgotPassword;

export const getChangePasswordState = (state: RootState) => state.userSlice.requests.changePassword;

export const getResetPasswordState = (state: RootState) => state.userSlice.requests.resetPassword;

export const getTestAuthState = (state: RootState) => state.userSlice.requests.testAuth;

export const getChangeFirstName = (state: RootState) => state.userSlice.requests.changeFirstName;

export const resetUserSliceRequestState = (requestStateName: string) => {
    return async (dispatch: Dispatch) => dispatch(actions.resetRequestState(requestStateName));
};

export const { actions } = userSlice;

export default userSlice.reducer;
