import {showVerifyAccountDialog} from 'components/DialogSystem/readyDialogs';
import {getNonFieldErrors} from 'components/Forms/util';
import {showSuccessToast} from 'components/Toast/readyToastNotifications';
import {User} from 'state/reducers/account/accountSlice.types';
import {pusherConnect} from 'state/services/pusherService';
import {store} from 'state/store';

import {queryClient} from '../App';

import {authGet, authPost, authPut, AxiosConfigs, QueryResponseError} from './base';

export const changeAbout = () => {
    return authPut<any>(['setAbout'], 'account/change-description')({
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
    return authPost<any>(['changeEmail'], 'account/change-email')({
        onSuccess: () => {
            // TODO: Invalidate current user query
            queryClient.invalidateQueries(['getProfile']);
        }
    });
};

export const changeUsername = () => {
    return authPost<any>(['changeUsername'], 'account/change-username')({
        onSuccess: () => {
            // TODO: Invalidate current user query
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const changePassword = () => {
    return authPost<any>(['changePassword'], 'account/change-password')({
        onSuccess: () => {
            // TODO: Should I invalidate something?
        }
    });
};

export const changeAvatar = () => {
    return authPut<any>(['changeAvatar'], 'account/change-avatar')({
        onSuccess: () => {
            // TODO: Add progress handler in mutation
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const forgotPassword = () => {
    return authPost<any>(['forgotPassword'], 'account/forgot-password')({});
};

export const changeAnimatedAvatar = () => {
    return authPut<any>(['changeAnimatedAvatar'], 'account/change-animated-avatar')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const login = () => {
    return authPost<any>(['login'], 'account/login')({
        onSuccess: (response) => {
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
    return authPost<any>(['register'], 'account/register')({});
};

export const logout = () => {
    queryClient.removeQueries(['user']);

    return authPost<any>(['logout'], 'account/logout')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const googleLogin = () => {
    return authPost<any>(['googleLogin'], 'account/google-login')({
        onSuccess: (response) => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const googleConnect = () => {
    return authPost<any>(['googleConnect'], 'account/google-connect')({
        onSuccess: (response) => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const deleteAccount = () => {
    return authPost<any>(['deleteAccount'], 'account/delete-account')({
        onSuccess: (response) => {
            queryClient.removeQueries(['user']);
        }
    });
};

export const disableAccount = () => {
    return authPost<any>(['disableAccount'], 'account/disable-account')({
        onSuccess: (response) => {
            queryClient.removeQueries(['user']);
        }
    });
};

export const createNewPassword = () => {
    return authPost<any>(['createNewPassword'], 'account/create-new-password')({});
};

export const verifyResetPasswordToken = () => {
    return authPost<any>(['verifyResetPasswordToken'], 'account/verify-reset-password-token')({});
};

export const confirmAccount = () => {
    return authPost<any>(['confirmAccount'],
        'account/verify-email',
        { ...AxiosConfigs.NO_CREDENTIALS })({
        onSuccess: (response) => {
            showSuccessToast('Your email has been verified');
        }
    });
};

export const resendRegistrationEmail = () => {
    return authPost<any>(['resendRegistrationEmail'], 'account/resend-email')({});
};

export const resetPassword = () => {
    return authPost<any>(['resetPassword'], 'account/reset-password')({});
};

export const googleDisconnect = () => {
    return authPost<any>(['googleDisconnect'], 'account/google-disconnect')({
        onSuccess: () => {
            queryClient.invalidateQueries(['user']);
        }
    });
};

export const getUser = () => {
    return authGet<User>(['user'], 'account/get-user')({
        onSuccess: (response) => {
            store.dispatch(pusherConnect());
        }
    });
};