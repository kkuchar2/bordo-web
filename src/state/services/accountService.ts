import {FormData} from 'util/util';

import {Dispatch} from 'redux';
import {UserInfoSchema} from 'state/reducers/account/accountSlice.schemas';
import {ApiClient} from 'state/store';
import {RequestType} from 'tools/client/client.types';
import {request} from 'tools/requests/request';

import {accountActions as actions} from './../reducers/account/accountSlice';
import {AxiosConfigs} from './config';

export const login = (user: string, password: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/login',
        action: actions.login,
        requestData: { email: user, password: password },
        responseSchema: UserInfoSchema,
        config: AxiosConfigs.WITH_CREDENTIALS
    });
};

export const register = (email: string, username: string, password: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/register',
        action: actions.registration,
        requestData: {
            email: email,
            username: username,
            password: password
        },
        config: AxiosConfigs.NO_CREDENTIALS
    });
};

export const autoLogin = () => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/autologin',
        action: actions.autoLogin,
        requestData: {},
        refreshTokenOnUnauthorized: true,
        responseSchema: UserInfoSchema,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const googleLogin = (credentialResponse: any) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/google-login',
        action: actions.googleLogin,
        requestData: credentialResponse,
        responseSchema: UserInfoSchema,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const logout = () => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/logout',
        action: actions.logout,
        requestData: {},
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const deleteAccount = (email: string, { current_password }: { current_password: string }) => {

    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/delete-account',
        action: actions.deleteAccount,
        requestData: {
            email: email,
            current_password: current_password
        },
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const disableAccount = (email: string, password: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/disable-account',
        action: actions.disableAccount,
        requestData: {
            email: email,
            password: password
        },
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const changeAvatar = (file: File) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.PUT_FILE,
        url: 'account/change-avatar',
        action: actions.changeAvatar,
        file: file,
        requestData: {
            use_animated_avatar: false
        },
        filePropertyName: 'avatar',
        refreshTokenOnUnauthorized: true,
        config: {
            onUploadProgress: () => {
            }, ...AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
        }
    });
};

export const changeAnimatedAvatar = (url: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.PUT,
        url: 'account/change-animated-avatar',
        action: actions.changeAnimatedAvatar,
        requestData: {
            animated_avatar: url,
            use_animated_avatar: true
        },
        filePropertyName: 'avatar',
        refreshTokenOnUnauthorized: true,
        config: {
            onUploadProgress: () => {
            }, ...AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
        }
    });
};

export const changeEmailAddress = (formData: FormData) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/change-email',
        action: actions.changeEmailAddress,
        refreshTokenOnUnauthorized: true,
        requestData: formData,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const sendEmailVerification = (email: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/resend-email',
        action: actions.accountVerificationEmail,
        requestData: {
            email: email
        },
        config: AxiosConfigs.NO_CREDENTIALS
    });
};

export const changeUsername = (formData: FormData) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/change-username',
        action: actions.changeUsername,
        refreshTokenOnUnauthorized: true,
        requestData: formData,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const changePassword = (formData: FormData) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/change-password',
        action: actions.changePassword,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
        requestData: formData
    });
};

export const disconnectFromGoogle = (formData: FormData) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/google-disconnect',
        action: actions.disconnectFromGoogle,
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF,
        requestData: formData
    });
};

export const forgotPassword = (email: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/forgot-password',
        action: actions.forgotPassword,
        requestData: {
            email: email
        },
        config: AxiosConfigs.NO_CREDENTIALS
    });
};

export const confirmAccount = (token: string | undefined) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/verify-email',
        action: actions.confirmRegistration,
        requestData: {
            key: token
        },
        config: AxiosConfigs.NO_CREDENTIALS
    });
};

export const createNewPassword = (new_password: string, new_password_confirm: string, uid: string, token: string) => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/create-new-password',
        action: actions.resetPassword,
        requestData: {
            new_password: new_password,
            new_password_confirm: new_password_confirm,
            uid: uid,
            token: token
        },
        config: AxiosConfigs.NO_CREDENTIALS
    });
};

export const askSetupPassword = () => {
    return request({
        axiosInstance: ApiClient,
        requestType: RequestType.POST,
        url: 'account/ask-setup-password',
        action: actions.askSetupPassword,
        requestData: {},
        config: AxiosConfigs.WITH_CREDENTIALS_AND_CSRF
    });
};

export const resetAccountSliceRequestState = (requestStateName: string) => {
    return async (dispatch: Dispatch) => dispatch(actions.resetRequestState(requestStateName));
};