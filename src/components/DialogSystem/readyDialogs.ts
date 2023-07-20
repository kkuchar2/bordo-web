import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon, KeyIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/solid';

import { SentEmailDialogArgs } from './readyDialogs.types';

import { VerifyAccountDialogProps } from '@/components/DialogSystem/dialogs';
import { GoogleIcon } from '@/components/Icons/GoogleIcon';
import { queryClient } from '@/config';
import { changeEmail, changePassword, changeUsername } from '@/queries/account';
import { User } from '@/queries/account/types';
import { openDialog } from '@/state/reducers/dialog/dialogSlice';
import { store } from '@/state/store';

export interface OpenReadyDialogArgs {
    passwordRequired: boolean;
    initialData?: any;
}

const checkShowPasswordRequired = (passwordRequired: boolean) => {
    if (passwordRequired) {
        const hasUsablePassword = queryClient.getQueryData<User>(['user'])?.has_usable_password;

        if (!hasUsablePassword) {
            showPasswordCreationRequiredDialog();
            return true;
        }
        return false;
    }
    return false;
};

export const showRegistrationCompleteDialog = () => {
    return showSentEmailDialog({
        component: 'SentEmailDialog',
        title: 'REGISTRATION_COMPLETE_TITLE',
        description: 'REGISTRATION_COMPLETE_DESCRIPTION',
        closeable: true
    });
};

export const showEmailChangeConfirmationSentDialog = () => {
    return showSentEmailDialog({
        component: 'SentEmailDialog',
        title: 'EMAIL_CHANGE_CONFIRMATION_SENT_TITLE',
        description: 'EMAIL_CHANGE_CONFIRMATION_SENT_DESCRIPTION',
        closeable: true
    });
};

export const showDialogAfterPasswordResetRequest = () => {
    return showSentEmailDialog({
        component: 'SentEmailDialog',
        title: 'PASSWORD_RESET_MAIL_SENT_TITLE',
        description: 'PASSWORD_RESET_MAIL_SENT_DESCRIPTION',
        closeable: true
    });
};

export const showDialogAfterFirstPasswordSetupRequest = () => {
    return showSentEmailDialog({
        component: 'SentEmailDialog',
        title: 'PASSWORD_CREATE_MAIL_SENT_TITLE',
        description: 'PASSWORD_CREATE_MAIL_SENT_DESCRIPTION',
        closeable: true,
        data: {
            showSignInButton: false
        }
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
                        color: '#24a0ed'
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
                    },
                    description: 'VERIFY_ACCOUNT_DESCRIPTION',
                    closeable: true
                },
                data: data
            }
        })
    );
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

export const showChangeUsernameDialog = (args: OpenReadyDialogArgs) => {
    const { passwordRequired, initialData } = args;

    if (checkShowPasswordRequired(passwordRequired)) {
        return;
    }

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
                    initialArgs: initialData
                }
            }
        })
    );
};

export const showChangeEmailDialog = (args: OpenReadyDialogArgs) => {
    const { passwordRequired } = args;

    if (checkShowPasswordRequired(passwordRequired)) {
        return;
    }

    store.dispatch(
        openDialog({
            component: 'ChangePropertyDialog',
            props: {
                dialog: {
                    title: 'CHANGE_EMAIL',
                    description: 'CHANGE_EMAIL_DESCRIPTION',
                    icon: {
                        component: EnvelopeIcon,
                        color: '#8ed3ed'
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
};

export const showChangePasswordDialog = (args: OpenReadyDialogArgs) => {
    const { passwordRequired, initialData } = args;

    if (checkShowPasswordRequired(passwordRequired)) {
        return;
    }

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
                        color: '#ffb700'
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
                        color: '#ca1717'
                    },
                    closeable: true
                },
                data: {}
            }
        })
    );
};

export const showPasswordCreationRequiredDialog = () => {
    store.dispatch(
        openDialog({
            component: 'PasswordCreationRequiredDialog',
            props: {
                dialog: {
                    title: 'PASSWORD_CREATION_REQUIRED_TITLE',
                    description: 'PASSWORD_REQUIRED_DESCRIPTION',
                    flexProps: {
                        minW: 400,
                        maxW: 500
                    },
                    icon: {
                        component: EnvelopeIcon,
                        color: '#24a0ed'
                    },
                }
            }
        })
    );
};

export const showDeleteAccountDialog = () => {
    if (checkShowPasswordRequired(true)) {
        return;
    }

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
                        color: '#801010'
                    },
                },
                data: {}
            }
        })
    );
};

export const showCreateGroupDialog = () => {
    store.dispatch(
        openDialog({
            component: 'CreateGroupDialog',
            props: {
                dialog: {
                    title: 'CREATE_GROUP',
                    description: 'CREATE_GROUP_DESCRIPTION',
                    icon: {
                        component: UsersIcon,
                        color: '#24a0ed'
                    },
                    flexProps: {
                        minWidth: 400,
                        maxWidth: 500
                    },
                },
                data: {}
            }
        })
    );
};

export const showDisconnectGoogleDialog = () => {
    if (checkShowPasswordRequired(true)) {
        return;
    }

    store.dispatch(
        openDialog({
            component: 'DisconnectGoogleDialog',
            props: {
                dialog: {
                    title: 'DISCONNECT_GOOGLE_ACCOUNT',
                    flexProps: {
                        minWidth: 400,
                        maxWidth: 400
                    },
                    icon: {
                        component: GoogleIcon
                    },
                },
                data: {}
            }
        })
    );
};