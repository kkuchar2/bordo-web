import { authGet, authPost, authPut, AxiosConfigs, QueryResponseError } from '../base';

import { User, UserProfile } from './types';

import {
    showEmailChangeConfirmationSentDialog,
    showRegistrationCompleteDialog,
    showVerifyAccountDialog
} from '@/components/DialogSystem/readyDialogs';
import { getNonFieldErrors } from '@/components/Forms/util';
import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { queryClient } from '@/config';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { store } from '@/state/store';

export const changeAbout = () => {
    return authPut(['setAbout'], 'account/change-description')({
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
    return authPost(['changeEmail'], 'account/change-email')({
        onSuccess: () => {
            showEmailChangeConfirmationSentDialog();
        }
    });
};

export const changeUsername = () => {
    return authPost(['changeUsername'], 'account/change-username')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            showSuccessToast('Username has been changed');
        }
    });
};

export const changePassword = () => {
    return authPost(['changePassword'], 'account/change-password')({
        onSuccess: () => {
            showSuccessToast('Password has been changed');
        }
    });
};

export const changeAvatar = () => {
    return authPost(['changeAvatar'], 'account/change-avatar')({
        onSuccess: () => {
            // TODO: Add progress handler in mutation
            queryClient.invalidateQueries(['user']);
            store.dispatch(closeDialog());
        }
    });
};

export const forgotPassword = () => {
    return authPost(['forgotPassword'], 'account/forgot-password')({});
};

export const changeAnimatedAvatar = () => {
    return authPut(['changeAnimatedAvatar'], 'account/change-animated-avatar')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            store.dispatch(closeDialog());
        }
    });
};

export const login = () => {
    return authPost(['login'], 'account/login')({
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
    return authPost(['register'], 'account/register')({
        onSuccess: () => {
            showRegistrationCompleteDialog();
        }
    });
};

export const logout = () => {
    return authPost(['logout'], 'account/logout')({
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
};

export const deleteAccount = () => {
    return authPost(['deleteAccount'], 'account/delete-account')({
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
};

export const disableAccount = () => {
    return authPost(['disableAccount'], 'account/disable-account')({
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
};

export const googleLogin = () => {
    return authPost(['googleLogin'], 'account/google-login')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const googleConnect = () => {
    return authPost(['googleConnect'], 'account/google-connect')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const createNewPassword = () => {
    return authPost(['createNewPassword'], 'account/create-new-password')({});
};

export const verifyResetPasswordToken = () => {
    return authPost(['verifyResetPasswordToken'], 'account/verify-reset-password-token')({});
};

export const confirmAccount = () => {
    return authPost(['confirmAccount'],
        'account/verify-email',
        { ...AxiosConfigs.NO_CREDENTIALS })({
        onSuccess: () => {
            showSuccessToast('An email has been verified');
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const resendRegistrationEmail = () => {
    return authPost(['resendRegistrationEmail'], 'account/resend-email')({});
};

export const resetPassword = () => {
    return authPost(['resetPassword'], 'account/reset-password')({});
};

export const googleDisconnect = () => {
    return authPost(['googleDisconnect'], 'account/google-disconnect')({
        onSuccess: () => {
            store.dispatch(closeDialog());
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const getUser = () => {
    return authGet<User>(['user'], 'account/user')({});
};

export const prepareAvatarUploadInfo = () => {
    return authPost(['avatarUploadInfo'], 'account/avatar-upload-info')({});
};

export const getProfile = (username: string) => {
    return authGet<UserProfile>(['profile', username], `people/profile/${username}`);
};