import {PlusIcon} from '@heroicons/react/outline';
import {MailIcon, TrashIcon} from '@heroicons/react/solid';
import {CreateNewModelItemDialogData} from 'components/DialogSystem/dialogs';
import {openDialog} from 'state/reducers/dialog/dialogSlice';
import {askSetupPassword, changeEmailAddress, changePassword, changeUsername} from 'state/services/accountService';
import {store} from 'state/store';

import {ReadyDialogArgs, SentEmailDialogArgs} from './readyDialogs.types';

export const showRegistrationCompleteDialog = () => {
    return showSentEmailDialog({
        component: 'RegistrationCompleteDialog',
        title: 'REGISTRATION_COMPLETE_TITLE',
        description: 'REGISTRATION_COMPLETE_DESCRIPTION',
        closeable: true
    });
};

export const showSentEmailDialog = (args: SentEmailDialogArgs) => {
    const { component, title, description, closeable } = args;

    store.dispatch(
        openDialog({
            component: component,
            props: {
                dialog: {
                    title: title,
                    icon: {
                        component: MailIcon,
                        color: '#24a0ed',
                        backgroundColor: '#1c3545'
                    },
                    description: description,
                    closeable: closeable
                },
                data: {}
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
                    width: 400
                },
                data: {}
            }
        })
    );
};

export const showConfirmEmailDialog = (args: ReadyDialogArgs) => {
    const { data } = args;

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

export const showChangeUsernameDialog = (args: ReadyDialogArgs) => {
    const { data } = args;

    const onlySocial = store.getState().account.user.social.only_social;

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
                        width: 400
                    },
                    data: {
                        formConfigKey: 'changeUsername',
                        propertyName: 'username',
                        requestStateName: 'changeUsername',
                        requestStateSelectorName: 'changeUsername',
                        dispatchFunc: changeUsername,
                        initialArgs: data
                    }
                }
            })
        );
    }
};

export const showChangeEmailDialog = (args: ReadyDialogArgs = {}) => {

    const onlySocial = store.getState().account.user.social.only_social;

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
                            component: MailIcon,
                            color: '#8ed3ed',
                            backgroundColor: '#265e80'
                        },
                        width: 400
                    },
                    data: {
                        formConfigKey: 'changeEmail',
                        propertyName: 'email',
                        requestStateName: 'changeEmail',
                        requestStateSelectorName: 'changeEmailAddress',
                        dispatchFunc: changeEmailAddress
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
                    width: 400
                },
                data: {
                    formConfigKey: 'changePassword',
                    requestStateSelector: 'changePassword',
                    requestStateName: 'changePassword',
                    dispatchFunc: changePassword
                }
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
                    width: 400,
                    title: title_key,
                    description: description_key,
                    icon: {
                        component: MailIcon,
                        color: '#24a0ed',
                        backgroundColor: '#1c3545'
                    },
                },
                data: {
                    formConfigKey: 'emptyForm',
                    requestStateSelector: 'askSetupPassword',
                    requestStateName: 'askSetupPassword',
                    dispatchFunc: askSetupPassword
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

export const showCreateModelItemDialog = (
    args: ReadyDialogArgs,
    fields: any,
    modelPackage: string,
    modelName: string
) => {
    store.dispatch(
        openDialog<CreateNewModelItemDialogData>({
            component: 'CreateNewModelItemDialog',
            props: {
                dialog: {
                    title: 'ADD_NEW_ROW'
                },
                data: {
                    fields: fields,
                    modelPackage: modelPackage,
                    modelName: modelName
                }
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
                    width: 400,
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

export const showAddTableItemDialog = (args: ReadyDialogArgs, fields: any, modelPackage: string, modelName: string) => {
    store.dispatch(
        openDialog<CreateNewModelItemDialogData>({
            component: 'CreateNewModelItemDialog',
            props: {
                dialog: {
                    title: 'ADD_NEW_ROW',
                    icon: {
                        component: PlusIcon,
                        color: '#24a0ed',
                        backgroundColor: '#1c3545'
                    },
                    width: 400
                },
                data: {
                    fields: fields,
                    modelPackage: modelPackage,
                    modelName: modelName
                }
            }
        })
    );
};
