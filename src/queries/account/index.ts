import { authPostQuery, authPutQuery } from '../authQueries';
import { AxiosConfigs, QueryResponseError } from '../base';

import { SignedAvatarUploadInfo, User } from './types';

import {
    showEmailChangeConfirmationSentDialog
} from '@/components/DialogSystem/readyDialogs';
import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { queryClient } from '@/config';
import { getQueryFirebase, postQueryFirebase, putQueryFirebase } from '@/queries/authWithFirebaseQueries';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { store } from '@/state/store';

export const changeAbout = () => {
    return putQueryFirebase(['setAbout'], 'account/change-description')({
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

export const changeAvatar = () => {
    return postQueryFirebase(['changeAvatar'], 'account/change-avatar')({
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

export const preDeleteAccount = () => {
    return postQueryFirebase(['deleteAccount'], 'account/pre-delete-account')({});
};

export const disableAccount = () => {
    return postQueryFirebase(['disableAccount'], 'account/disable-account')({
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        }
    });
};

export const googleConnect = () => {
    return postQueryFirebase(['googleConnect'], 'account/google-connect')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const createNewPassword = () => {
    return postQueryFirebase(['createNewPassword'], 'account/create-new-password')({});
};

export const verifyResetPasswordToken = () => {
    return postQueryFirebase(['verifyResetPasswordToken'], 'account/verify-reset-password-token')({});
};

export const confirmAccount = () => {
    return postQueryFirebase(['confirmAccount'], 'account/verify-email', () => AxiosConfigs.NO_CREDENTIALS)({
        onSuccess: () => {
            showSuccessToast('An email has been verified');
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const resendRegistrationEmail = () => {
    return postQueryFirebase(['resendRegistrationEmail'], 'account/resend-email')({});
};

export const resetPassword = () => {
    return postQueryFirebase(['resetPassword'], 'account/reset-password')({});
};

export const googleDisconnect = () => {
    return postQueryFirebase(['googleDisconnect'], 'account/google-disconnect')({
        onSuccess: () => {
            store.dispatch(closeDialog());
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const getUser = () => {
    return getQueryFirebase<User>(['user'], 'account/user')({});
};

export const signAvatarUploadUrl = () => {
    return postQueryFirebase<SignedAvatarUploadInfo>(['signedAvatarUploadInfo'], 'account/sign-avatar-upload-url');
};