import {closeDialog, openDialog} from "appRedux/reducers/application";
import {CreateNewModelItemDialogData} from "components/Dialogs/CreateNewModelItemDialog/CreateNewModelItemDialog";

import {ReadyDialogArgs} from "./readyDialogs.types";

export const showRegistrationCompleteDialog = (args: ReadyDialogArgs) => {

    const { dispatch, navigate, translation } = args;

    dispatch(openDialog({
        component: "RegistrationCompleteDialog",
        props: {
            dialog: {
                title: translation('REGISTRATION_COMPLETE_TITLE'),
                description: translation('REGISTRATION_COMPLETE_DESCRIPTION'),
            },
            data: {
                onGoHome: () => {
                    dispatch(closeDialog());
                    navigate('/');
                }
            }
        }
    }));
};

export const showVerificationEmailSentDialog = (args: ReadyDialogArgs) => {

    const { dispatch, navigate, translation } = args;

    dispatch(openDialog({
        component: "VerificationEmailSentDialog",
        props: {
            dialog: {
                title: translation('Verification email sent'),
                description: translation('VERIFICATION_EMAIL_SENT_DESCRIPTION'),
            },
            data: {
                onGoHome: () => {
                    dispatch(closeDialog());
                    navigate('/');
                }
            }
        }
    }));
};

export const showSentResetPasswordMailDialog = (args: ReadyDialogArgs) => {

    const { dispatch, navigate, translation } = args;

    dispatch(openDialog({
        component: "SentPasswordResetMailDialog",
        props: {
            dialog: {
                title: translation('PASSWORD_RESET_MAIL_SENT_TITLE'),
                description: translation('PASSWORD_RESET_MAIL_SENT_DESCRIPTION'),
            },
            data: {
                onGoHome: () => {
                    dispatch(closeDialog());
                    navigate('/');
                }
            }
        }
    }));
};

export const showChangeAvatarDialog = (args: ReadyDialogArgs) => {

    const { dispatch, translation } = args;

    dispatch(openDialog({
        component: "ChangeAvatarDialog",
        props: {
            dialog: {
                title: translation('SELECT_IMAGE'),
                description: '',
            },
            data: {}
        }
    }));
};

export const showChangeEmailDialog = (args: ReadyDialogArgs) => {

    const { dispatch, translation } = args;

    dispatch(openDialog({
        component: "ChangeEmailDialog",
        props: {
            dialog: {
                title: translation('CHANGE_EMAIL'),
                description: 'Enter a new email address and your existing password.'
            },
            data: {}
        }
    }));
};

export const showConfirmEmailDialog = (args: ReadyDialogArgs) => {

        const { dispatch, translation, data } = args;

        dispatch(openDialog({
            component: "SendConfirmationMailDialog",
            props: {
                dialog: {
                    title: "Please verify your email address",
                },
                data: data
            }
        }));
};

export const showChangeUsernameDialog = (args: ReadyDialogArgs) => {

    const { dispatch, translation } = args;

    dispatch(openDialog({
        component: "ChangeUsernameDialog",
        props: {
            dialog: {
                title: translation('CHANGE_USERNAME'),
                description: 'Enter a new username and your existing password.'
            },
            data: {}
        }
    }));
};

export const showChangeNormalPropertyDialog = (args: ReadyDialogArgs) => {

    const { dispatch, translation } = args;

    dispatch(openDialog({
        component: "ChangeTextPropertyDialog",
        props: {
            dialog: {
                title: translation('CHANGE_PROPERTY'),
                description: '',
            },
            data: {}
        }
    }));
};

export const showChangePasswordDialog = (args: ReadyDialogArgs) => {

    const { dispatch, translation } = args;

    dispatch(openDialog({
        component: "ChangePasswordDialog",
        props: {
            dialog: {
                title: translation('CHANGE_PASSWORD'),
                description: 'Enter your current password and a new password.'
            },
            data: {}
        }
    }));
};

export const showCreateModelItemDialog = (args: ReadyDialogArgs, fields: any, modelPackage: string, modelName: string) => {

    const { dispatch, translation } = args;

    dispatch(openDialog<CreateNewModelItemDialogData>({
        component: "CreateNewModelItemDialog",
        props: {
            dialog: {
                title: translation('ADD_NEW_ROW')
            },
            data: {
                fields: fields,
                modelPackage: modelPackage,
                modelName: modelName
            }
        }
    }));
};

export const showDeleteAccountDialog = (args: ReadyDialogArgs) => {

    const { dispatch, translation } = args;

    dispatch(openDialog({
        component: "DeleteAccountDialog",
        props: {
            dialog: {
                title: translation('DELETE_ACCOUNT'),
                description: ''
            },
            data: {}
        }
    }));
};

export const showDisableAccountDialog = (args: ReadyDialogArgs) => {

        const { dispatch, translation } = args;

        dispatch(openDialog({
            component: "DisableAccountDialog",
            props: {
                dialog: {
                    title: translation('DISABLE_ACCOUNT'),
                    description: ''
                },
                data: {}
            }
        }));
};