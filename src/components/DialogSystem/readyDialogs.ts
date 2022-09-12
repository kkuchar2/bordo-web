import {ExclamationCircleIcon} from '@heroicons/react/24/outline';
import {EnvelopeIcon, KeyIcon, TrashIcon} from '@heroicons/react/24/solid';
import {VerifyAccountDialogProps} from 'components/DialogSystem/dialogs';
import {User} from 'state/reducers/account/accountSlice.types';
import {openDialog} from 'state/reducers/dialog/dialogSlice';
import {store} from 'state/store';

import {queryClient} from '../../App';
import {changeEmail, changePassword, changeUsername} from '../../queries/account';

import {SentEmailDialogArgs} from './readyDialogs.types';

export const showRegistrationCompleteDialog = () => {
    return showSentEmailDialog({
        component: 'RegistrationCompleteDialog',
        title: 'REGISTRATION_COMPLETE_TITLE',
        description: 'REGISTRATION_COMPLETE_DESCRIPTION',
        closeable: true
    });
};

export const showSentEmailDialog = <T = any>(args: SentEmailDialogArgs<T>) => {
    const { component, title, description, closeable, data } = args;

    store.dispatch(
        openDialog<T>({
            component: component,
            props: {
                dialog: {
                    title: title,
                    icon: {
                        component: EnvelopeIcon,
                        color: '#24a0ed',
                        backgroundColor: '#1c3545'
                    },
                    description: description,
                    closeable: closeable
                },
                data: data
            }
        })
    );
};

export const showVerifyAccountDialog = (data: VerifyAccountDialogProps) => {
    store.dispatch(
        openDialog<VerifyAccountDialogProps>({
            component: 'VerifyAccountDialog',
            props: {
                dialog: {
                    title: 'ACCOUNT_UNVERIFIED',
                    icon: {
                        component: EnvelopeIcon,
                        color: '#24a0ed',
                        backgroundColor: '#1c3545'
                    },
                    description: 'VERIFY_ACCOUNT_DESCRIPTION',
                    closeable: true
                },
                data: data
            }
        })
    );
};

export const showDialogAfterPasswordResetRequest = () => {
    return showSentEmailDialog({
        component: 'SentPasswordResetMailDialog',
        title: 'PASSWORD_RESET_MAIL_SENT_TITLE',
        description: 'PASSWORD_RESET_MAIL_SENT_DESCRIPTION',
        closeable: true
    });
};

export const showDialogAfterFirstPasswordSetupRequest = () => {
    return showSentEmailDialog({
        component: 'SentPasswordResetMailDialog',
        title: 'PASSWORD_CREATE_MAIL_SENT_TITLE',
        description: 'PASSWORD_CREATE_MAIL_SENT_DESCRIPTION',
        closeable: true
    });
};

export const showChangeAvatarDialog = () => {
    store.dispatch(
        openDialog({
            component: 'ChangeAvatarDialog',
            props: {
                dialog: {
                    title: 'CHANGE_AVATAR',
                    description: '',
                    flexProps: {
                        minWidth: 400
                    },
                },
                data: {}
            }
        })
    );
};

export const showConfirmEmailDialog = <T>(data: T) => {

    store.dispatch(
        openDialog({
            component: 'SendConfirmationMailDialog',
            props: {
                dialog: {
                    title: 'Please verify your email address'
                },
                data: data
            }
        })
    );
};

export const showChangeUsernameDialog = (initialArgs: any) => {
    const { data } = initialArgs;

    const onlySocial = queryClient.getQueryData<User>(['user'])?.social.only_social;

    if (onlySocial) {
        showPasswordCreationRequiredDialog('CHANGE_USERNAME', 'CHANGE_USERNAME_PASSWORD_SETUP');
    }
    else {
        store.dispatch(
            openDialog({
                component: 'ChangePropertyDialog',
                props: {
                    dialog: {
                        title: 'CHANGE_USERNAME',
                        description: 'CHANGE_USERNAME_DESCRIPTION',
                        flexProps: {
                            minWidth: 200,
                            maxWidth: 400
                        },
                    },
                    data: {
                        formConfigKey: 'changeUsername',
                        propertyName: 'username',
                        queryFunc: changeUsername,
                        initialArgs: data
                    }
                }
            })
        );
    }
};

export const showChangeEmailDialog = (initialArgs: any) => {

    const onlySocial = queryClient.getQueryData<User>(['user'])?.social.only_social;

    if (onlySocial) {
        showPasswordCreationRequiredDialog('CHANGE_EMAIL', 'CHANGE_EMAIL_PASSWORD_SETUP');
    }
    else {
        store.dispatch(
            openDialog({
                component: 'ChangePropertyDialog',
                props: {
                    dialog: {
                        title: 'CHANGE_EMAIL',
                        description: 'CHANGE_EMAIL_DESCRIPTION',
                        icon: {
                            component: EnvelopeIcon,
                            color: '#8ed3ed',
                            backgroundColor: '#265e80'
                        },
                        flexProps: {
                            minWidth: 400
                        },
                    },
                    data: {
                        formConfigKey: 'changeEmail',
                        propertyName: 'email',
                        queryFunc: changeEmail,
                    }
                }
            })
        );
    }
};

export const showChangePasswordDialog = () => {
    store.dispatch(
        openDialog({
            component: 'ChangePropertyDialog',
            props: {
                dialog: {
                    title: 'CHANGE_PASSWORD',
                    description: 'CHANGE_PASSWORD_DESCRIPTION',
                    flexProps: {
                        minWidth: 400
                    },
                    icon: {
                        component: KeyIcon,
                        color: '#ffb700',
                        backgroundColor: 'rgba(255,255,255,0.11)'
                    },
                },
                data: {
                    formConfigKey: 'changePassword',
                    queryFunc: changePassword,
                }
            }
        })
    );
};

export const showServiceUnavailableDialog = () => {
    store.dispatch(
        openDialog({
            component: 'ServiceUnavailableDialog',
            props: {
                dialog: {
                    title: 'SERVICE_UNAVAILABLE_TITLE',
                    description: 'SERVICE_UNAVAILABLE_DESCRIPTION',
                    icon: {
                        component: ExclamationCircleIcon,
                        color: '#ca1717',
                        backgroundColor: '#451c1c'
                    },
                    closeable: true
                },
                data: {}
            }
        })
    );
};

export const showPasswordCreationRequiredDialog = (title_key: string, description_key: string) => {
    store.dispatch(
        openDialog({
            component: 'PasswordCreationRequiredDialog',
            props: {
                dialog: {
                    title: 'PASSWORD_CREATION_REQUIRED_TITLE',
                    description: description_key,
                    flexProps: {
                        minW: 400,
                        maxW: 500
                    },
                    icon: {
                        component: EnvelopeIcon,
                        color: '#24a0ed',
                        backgroundColor: '#1c3545'
                    },
                }
            }
        })
    );
};

export const showDeleteAccount = (isOnlySocial: boolean) => {
    if (isOnlySocial) {
        showPasswordCreationRequiredDialog('DELETE_ACCOUNT', 'DELETE_ACCOUNT_PASSWORD_SETUP');
    }
    else {
        showDeleteAccountDialog();
    }
};

export const showDeleteAccountDialog = () => {
    store.dispatch(
        openDialog({
            component: 'DeleteAccountDialog',
            props: {
                dialog: {
                    flexProps: {
                        minWidth: 200,
                        maxWidth: 400
                    },
                    title: 'DELETE_ACCOUNT',
                    description: '',
                    icon: {
                        component: TrashIcon,
                        color: 'red.900',
                        backgroundColor: '#1c3545'
                    },
                },
                data: {}
            }
        })
    );
};