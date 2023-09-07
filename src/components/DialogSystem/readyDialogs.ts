import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { EnvelopeIcon, KeyIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/solid';

import { SentEmailDialogArgs } from './readyDialogs.types';

import { changeEmailForm } from '@/components/Forms/formConfig';
import { GoogleIcon } from '@/components/Icons/GoogleIcon';
import { changeEmail } from '@/queries/account';
import { openDialog } from '@/state/reducers/dialog/dialogSlice';
import { store } from '@/state/store';

export interface OpenReadyDialogArgs {
    initialValues?: any;
}

export const showRegistrationCompleteDialog = () => {
    return showSentEmailDialog({
        component: 'SentEmailDialog',
        title: 'REGISTRATION_COMPLETE_TITLE',
        description: 'REGISTRATION_COMPLETE_DESCRIPTION',
        closeable: true,
        data: {}
    });
};

export const showEmailChangeConfirmationSentDialog = () => {
    return showSentEmailDialog({
        component: 'SentEmailDialog',
        title: 'EMAIL_CHANGE_CONFIRMATION_SENT_TITLE',
        description: 'EMAIL_CHANGE_CONFIRMATION_SENT_DESCRIPTION',
        closeable: true,
        data: {}
    });
};

export const showDialogAfterPasswordResetRequest = () => {
    return showSentEmailDialog({
        component: 'SentEmailDialog',
        title: 'PASSWORD_RESET_MAIL_SENT_TITLE',
        description: 'PASSWORD_RESET_MAIL_SENT_DESCRIPTION',
        closeable: true,
        data: {}
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

export const showVerifyAccountDialog = () => {
    store.dispatch(
        openDialog({
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
                data: {}
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
                    description: ''
                },
                data: {}
            }
        })
    );
};

export const showChangeAvatarModeDialog = () => {
    store.dispatch(
        openDialog({
            component: 'ChangeAvatarModeDialog',
            props: {
                dialog: {
                    title: 'CHANGE_AVATAR',
                    description: '',
                    maxWidth: 400
                },
                data: {}
            }
        })
    );
};

export const showSelectGIFDialog = () => {
    store.dispatch(
        openDialog({
            component: 'SelectGIFDialog',
            props: {
                dialog: {
                    title: 'CHANGE_AVATAR',
                    arrowBack: true,
                    onBack: () => {
                        showChangeAvatarModeDialog();
                    },
                    description: '',
                    maxWidth: 500
                },
                data: {}
            }
        })
    );
};

export const showEditImageDialog = (file: File) => {
    store.dispatch(
        openDialog({
            component: 'EditImageDialog',
            props: {
                dialog: {
                    title: 'CHANGE_AVATAR',
                    arrowBack: true,
                    onBack: () => {
                        showChangeAvatarModeDialog();
                    },
                    description: '',
                    maxWidth: 500
                },
                data: {
                    file: file
                }
            }
        })
    );
};

export const showUpdateEmailDialog = (args: OpenReadyDialogArgs) => {
    const { initialValues } = args;

    store.dispatch(
        openDialog({
            component: 'UpdateEmailDialog',
            props: {
                dialog: {
                    title: 'CHANGE_EMAIL',
                    description: 'CHANGE_EMAIL_DESCRIPTION',
                    icon: {
                        component: EnvelopeIcon,
                        color: '#8ed3ed'
                    }
                },
                data: {
                    formConfig: changeEmailForm,
                    propertyName: 'email',
                    queryFunction: changeEmail,
                    initialValues: initialValues
                }
            }
        })
    );
};

export const showUpdatePasswordDialog = (args: OpenReadyDialogArgs) => {
    store.dispatch(
        openDialog({
            component: 'UpdatePasswordDialog',
            props: {
                dialog: {
                    title: 'UPDATE_PASSWORD',
                    description: 'CHANGE_PASSWORD_DESCRIPTION',
                    icon: {
                        component: KeyIcon,
                        color: '#ffb700'
                    },
                },
                data: {}
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

export const showDeleteAccountDialog = () => {
    store.dispatch(
        openDialog({
            component: 'DeleteAccountDialog',
            props: {
                dialog: {
                    title: 'DELETE_ACCOUNT',
                    description: '',
                    icon: {
                        component: TrashIcon,
                        color: '#ca3535'
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
                    }
                },
                data: {}
            }
        })
    );
};

export const showDisconnectGoogleDialog = () => {
    store.dispatch(
        openDialog({
            component: 'DisconnectGoogleDialog',
            props: {
                dialog: {
                    title: 'DISCONNECT_GOOGLE_ACCOUNT',
                    icon: {
                        component: GoogleIcon
                    },
                },
                data: {}
            }
        })
    );
};