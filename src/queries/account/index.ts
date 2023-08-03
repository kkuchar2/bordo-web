import { authGetQuery, authGetQueryWithHeaders, authPostQuery, authPutQuery } from '../authQueries';
import { AxiosConfigs, QueryResponseError } from '../base';

import { SignedAvatarUploadInfo, User, UserProfile } from './types';

import {
    showEmailChangeConfirmationSentDialog,
    showRegistrationCompleteDialog,
    showVerifyAccountDialog
} from '@/components/DialogSystem/readyDialogs';
import { getNonFieldErrors } from '@/components/Forms/util';
import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { isFirebaseAuthEnabled, queryClient } from '@/config';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { store } from '@/state/store';

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
    return authPostQuery(['changeAvatar'], 'account/change-avatar')({
        onSuccess: () => {
            // TODO: Add progress handler in mutation
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
                showVerifyAccountDialog({
                    usernameOrEmail: data.username_or_email
                });
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
    return authPostQuery(['deleteAccount'], 'account/delete-account')({
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
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const googleConnect = () => {
    return authPostQuery(['googleConnect'], 'account/google-connect')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const createNewPassword = () => {
    return authPostQuery(['createNewPassword'], 'account/create-new-password')({});
};

export const verifyResetPasswordToken = () => {
    return authPostQuery(['verifyResetPasswordToken'], 'account/verify-reset-password-token')({});
};

export const confirmAccount = () => {
    return authPostQuery(['confirmAccount'],
        'account/verify-email',
        { ...AxiosConfigs.NO_CREDENTIALS })({
        onSuccess: () => {
            showSuccessToast('An email has been verified');
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const resendRegistrationEmail = () => {
    return authPostQuery(['resendRegistrationEmail'], 'account/resend-email')({});
};

export const resetPassword = () => {
    return authPostQuery(['resetPassword'], 'account/reset-password')({});
};

export const googleDisconnect = () => {
    return authPostQuery(['googleDisconnect'], 'account/google-disconnect')({
        onSuccess: () => {
            store.dispatch(closeDialog());
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const getUser = () => {
    const header = isFirebaseAuthEnabled ? {
        'Authorization': 'Bearer ' + localStorage.getItem('firebase_token')
    } : {};

    return authGetQueryWithHeaders<User>(['user'], 'account/user', header)({});
};

export const signAvatarUploadUrl = () => {
    return authPostQuery<SignedAvatarUploadInfo>(['signedAvatarUploadInfo'], 'account/sign-avatar-upload-url');
};

export const getProfile = (username: string) => {
    return authGetQuery<UserProfile>(['profile', username], `people/profile/${username}`);
};