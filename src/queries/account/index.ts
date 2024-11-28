import { authGetQuery, authPostQuery, authPutQuery, postQuery } from '../queries';

import { NewUserInfo, SignAvatarRequestData, SignedAvatarUploadInfo } from './types';

import {
    showEmailChangeConfirmationSentDialog,
    showRegistrationCompleteDialog
} from '@/components/DialogSystem/readyDialogs';
import {
    ChangeAvatarFormArgs,
    CreateNewPasswordFormArgs,
    CurrentPasswordArgs,
    EmailArgs,
    KeyData,
    LoginFormArgs,
    RegistrationFormArgs,
    ResetPasswordRequestData,
    TokenData
} from '@/components/Forms/formConfig.types';
import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { queryClient } from '@/config';
import { QueryResponseError } from '@/queries/base';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { store } from '@/state/store';

const invalidateUserQueries = () => {
    queryClient.invalidateQueries({
        queryKey: ['user'],
    });
};

export const changeEmail = () => {
    return authPostQuery(['changeEmail'], 'account/change-email')({
        onSuccess: () => {
            showEmailChangeConfirmationSentDialog();
        }
    });
};

export const changeUsername = () => {
    return authPostQuery(['changeUsername'], 'account/change-username')({
        onSuccess: () => {
            invalidateUserQueries();
            showSuccessToast('Username has been changed');
        }
    });
};

export const changePassword = () => {
    return authPostQuery(['changePassword'], 'account/change-password')({
        onSuccess: () => {
            showSuccessToast('Password has been changed');
        }
    });
};

export const changeAvatar = () => {
    return authPostQuery<unknown, QueryResponseError, ChangeAvatarFormArgs>
    (['changeAvatar'], 'account/change-avatar')({
        onSuccess: () => {
            invalidateUserQueries();
            store.dispatch(closeDialog());
        }
    });
};

export const forgotPassword = () => {
    return authPostQuery<unknown, QueryResponseError, EmailArgs>
    (['forgotPassword'], 'account/forgot-password')({});
};

export const changeAnimatedAvatar = () => {
    return authPutQuery(['changeAnimatedAvatar'], 'account/change-animated-avatar')({
        onSuccess: () => {
            invalidateUserQueries();
            store.dispatch(closeDialog());
        }
    });
};

export const login = () => {
    return authPostQuery<unknown, QueryResponseError, LoginFormArgs>(['login'], '/login')({
        onSuccess: () => {
            invalidateUserQueries();
        }
    });
};

export const register = () => {
    return postQuery<unknown, QueryResponseError, RegistrationFormArgs>(['register'], '/signup')({
        onSuccess: () => {
            showRegistrationCompleteDialog();
        }
    });
};

export const logout = () => {
    return authPostQuery(['logout'], '/logout')({
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
};

export const deleteAccount = () => {
    return authPostQuery <unknown, QueryResponseError, CurrentPasswordArgs>
    (['deleteAccount'], 'account/delete-account')({
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
};

export const disableAccount = () => {
    return authPostQuery(['disableAccount'], 'account/disable-account')({
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
};

export const googleLogin = () => {
    return authPostQuery(['googleLogin'], 'account/google-login')({
        onSuccess: () => {
            invalidateUserQueries();
        }
    });
};

export const googleConnect = () => {
    return authPostQuery(['googleConnect'], 'account/google-connect')({
        onSuccess: () => {
            invalidateUserQueries();
        }
    });
};

export const createNewPassword = () => {
    return authPostQuery<unknown, QueryResponseError, CreateNewPasswordFormArgs>
    (['createNewPassword'], 'account/create-new-password')({});
};

export const verifyResetPasswordToken = () => {
    return authPostQuery<unknown, QueryResponseError, TokenData>
    (['verifyResetPasswordToken'], 'account/verify-reset-password-token')({});
};

export const confirmAccount = () => {
    return postQuery <unknown, QueryResponseError, KeyData>
    (['confirmAccount'], 'account/verify-email')({
        onSuccess: () => {
            showSuccessToast('An email has been verified');
            invalidateUserQueries();
        }
    });
};

export const resendRegistrationEmail = () => {
    return authPostQuery <unknown, QueryResponseError, EmailArgs>
    (['resendRegistrationEmail'], 'account/resend-email')({});
};

export const resetPassword = () => {
    return authPostQuery<unknown, QueryResponseError, ResetPasswordRequestData>
    (['resetPassword'], 'account/reset-password')({});
};

export const googleDisconnect = () => {
    return authPostQuery<unknown, QueryResponseError, CurrentPasswordArgs>
    (['googleDisconnect'], 'account/google-disconnect')({
        onSuccess: () => {
            store.dispatch(closeDialog());
            invalidateUserQueries();
        }
    });
};

export const getUser = () => {
    return authGetQuery<NewUserInfo>(['user'], '/user')();
};

export const signAvatarUploadUrl = () => {
    return authPostQuery<SignedAvatarUploadInfo, QueryResponseError, SignAvatarRequestData>
    (['signedAvatarUploadInfo'], 'account/sign-avatar-upload-url');
};