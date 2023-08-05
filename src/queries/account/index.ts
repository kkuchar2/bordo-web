import { MutationKey, QueryKey } from '@tanstack/query-core';

import { authGetQuery, authPostQuery, authPutQuery } from '../authQueries';
import { AxiosConfigs, QueryResponseError } from '../base';

import { SignedAvatarUploadInfo, User } from './types';

import {
    showEmailChangeConfirmationSentDialog,
    showRegistrationCompleteDialog,
    showVerifyAccountDialog
} from '@/components/DialogSystem/readyDialogs';
import { getNonFieldErrors } from '@/components/Forms/util';
import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { isFirebaseAuthEnabled, queryClient } from '@/config';
import { getQueryFirebase, postQueryFirebase } from '@/queries/authWithFirebaseQueries';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { store } from '@/state/store';

const variableAuthPostQuery = <Resp = any>(mutationKey: MutationKey, url: string) => {
    if (isFirebaseAuthEnabled()) {
        return postQueryFirebase<Resp>(mutationKey, url);
    }
    return authPostQuery<Resp>(mutationKey, url);
};

const variableAuthGetQuery = <Resp = any>(queryKey: QueryKey, url: string) => {
    if (isFirebaseAuthEnabled()) {
        return getQueryFirebase<Resp>(queryKey, url);
    }
    return authGetQuery<Resp>(queryKey, url);
};

export const changeAbout = () => {
    return authPutQuery(['setAbout'], 'account/change-description')({
        onMutate: async (data: any) => {

            console.log('Change about onMutate', data);

            await queryClient.cancelQueries(['user']);
            const previousUser = queryClient.getQueryData(['user']);
            queryClient.setQueryData(['user'], (old: User) => {
                return {
                    ...old, profile: {
                        ...old.profile,
                        about: data['about']
                    }
                };
            });
            return { previousUser };
        },
        onError: (err: QueryResponseError, data: any, context: any) => {
            queryClient.setQueryData(['user'], context.previousUser);
        },
        onSettled: () => {
            queryClient.invalidateQueries(['user']);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
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
            queryClient.invalidateQueries(['user']);
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
    return variableAuthPostQuery(['changeAvatar'], 'account/change-avatar')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            store.dispatch(closeDialog());
        }
    });
};

export const forgotPassword = () => {
    return authPostQuery(['forgotPassword'], 'account/forgot-password')({});
};

export const changeAnimatedAvatar = () => {
    return authPutQuery(['changeAnimatedAvatar'], 'account/change-animated-avatar')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            store.dispatch(closeDialog());
        }
    });
};

export const login = () => {
    return authPostQuery(['login'], 'account/login')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        },
        onError: (error: QueryResponseError, data: any) => {
            const hasEmailNotVerified = getNonFieldErrors(error?.data)
                ?.some((error: any) => error === 'email_not_verified');

            if (hasEmailNotVerified) {
                showVerifyAccountDialog();
            }
        }
    });
};

export const register = () => {
    return authPostQuery(['register'], 'account/register')({
        onSuccess: () => {
            showRegistrationCompleteDialog();
        }
    });
};

export const logout = () => {
    return authPostQuery(['logout'], 'account/logout')({
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
};

export const deleteAccount = () => {
    return variableAuthPostQuery(['deleteAccount'], 'account/delete-account')({
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
};

export const disableAccount = () => {
    return variableAuthPostQuery(['disableAccount'], 'account/disable-account')({
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
};

export const googleLogin = () => {
    return variableAuthPostQuery(['googleLogin'], 'account/google-login')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const googleConnect = () => {
    return variableAuthPostQuery(['googleConnect'], 'account/google-connect')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const createNewPassword = () => {
    return variableAuthPostQuery(['createNewPassword'], 'account/create-new-password')({});
};

export const verifyResetPasswordToken = () => {
    return variableAuthPostQuery(['verifyResetPasswordToken'], 'account/verify-reset-password-token')({});
};

export const confirmAccount = () => {
    return variableAuthPostQuery(['confirmAccount'], 'account/verify-email', () => AxiosConfigs.NO_CREDENTIALS)({
        onSuccess: () => {
            showSuccessToast('An email has been verified');
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const resendRegistrationEmail = () => {
    return variableAuthPostQuery(['resendRegistrationEmail'], 'account/resend-email')({});
};

export const resetPassword = () => {
    return variableAuthPostQuery(['resetPassword'], 'account/reset-password')({});
};

export const googleDisconnect = () => {
    return variableAuthPostQuery(['googleDisconnect'], 'account/google-disconnect')({
        onSuccess: () => {
            store.dispatch(closeDialog());
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const getUser = () => {
    return variableAuthGetQuery<User>(['user'], 'account/user')({});
};

export const signAvatarUploadUrl = () => {
    return variableAuthPostQuery<SignedAvatarUploadInfo>(['signedAvatarUploadInfo'], 'account/sign-avatar-upload-url');
};