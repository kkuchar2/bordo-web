import { SignedAvatarUploadInfo, User } from './types';

import { showEmailChangeConfirmationSentDialog } from '@/components/DialogSystem/readyDialogs';
import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { queryClient } from '@/config';
import { getQueryFirebase, postQueryFirebase, putQueryFirebase } from '@/queries/authWithFirebaseQueries';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { store } from '@/state/store';

export const changeEmail = () => {
    return postQueryFirebase(['changeEmail'], 'account/change-email')({
        onSuccess: () => {
            showEmailChangeConfirmationSentDialog();
        }
    });
};

export const changeUsername = () => {
    return postQueryFirebase(['changeUsername'], 'account/change-username')({
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
    return postQueryFirebase(['forgotPassword'], 'account/forgot-password')({});
};

export const changeAnimatedAvatar = () => {
    return putQueryFirebase(['changeAnimatedAvatar'], 'account/change-animated-avatar')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
            store.dispatch(closeDialog());
        }
    });
};

export const deleteAccount = () => {
    return postQueryFirebase(['deleteAccount'], 'account/delete')({});
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
    return postQueryFirebase(['confirmAccount'], 'account/verify-email')({
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
    return postQueryFirebase<SignedAvatarUploadInfo>(['signedAvatarUploadInfo'], 'account/sign-avatar-upload-url')({});
};