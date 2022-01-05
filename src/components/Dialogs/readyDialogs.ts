import {closeDialog, openDialog} from "appRedux/reducers/application";
import {AppDispatch} from "appRedux/store";
import {TFunction} from "react-i18next";
import {NavigateFunction} from "react-router";

export const showRegistrationCompleteDialog = (dispatch: AppDispatch, navigate: NavigateFunction,
                                               translation: TFunction<"translation">) => {
    dispatch(openDialog({
        component: "RegistrationCompleteDialog",
        props: {
            title: translation('REGISTRATION_COMPLETE_TITLE'),
            description: translation('REGISTRATION_COMPLETE_DESCRIPTION'),
            onGoHome: () => {
                dispatch(closeDialog());
                navigate('/');
            }
        }
    }));
};

export const showSentResetPasswordMailDialog = (dispatch: AppDispatch, navigate: NavigateFunction,
                                               translation: TFunction<"translation">) => {
    dispatch(openDialog({
        component: "SentPasswordResetMailDialog",
        props: {
            title: translation('PASSWORD_RESET_MAIL_SENT_TITLE'),
            description: translation('PASSWORD_RESET_MAIL_SENT_DESCRIPTION'),
            onGoHome: () => {
                dispatch(closeDialog());
                navigate('/');
            }
        }
    }));
};

export const showChangeAvatarDialog = (dispatch: AppDispatch, translation: TFunction<"translation">) => {
    dispatch(openDialog({
        component: "ChangeAvatarDialog",
        props: {
            title: translation('CHANGE_AVATAR'),
            description: '',
            onConfirm: () => {
                dispatch(closeDialog());
            },
            onCancel: () => {
                dispatch(closeDialog());
            }
        }
    }));
};

export const showChangeEmailDialog = (dispatch: AppDispatch, translation: TFunction<"translation">) => {
    dispatch(openDialog({
        component: "ChangeEmailDialog",
        props: {
            title: translation('CHANGE_EMAIL'),
            description: '',
            onConfirm: () => {

            },
            onCancel: () => {
                dispatch(closeDialog());
            }
        }
    }));
};

export const showChangePasswordDialog = (dispatch: AppDispatch, translation: TFunction<"translation">) => {
    dispatch(openDialog({
        component: "ChangePasswordDialog",
        props: {
            title: translation('CHANGE_PASSWORD'),
            description: '',
            onConfirm: () => {
                dispatch(closeDialog());
            },
            onCancel: () => {
                dispatch(closeDialog());
            }
        }
    }));
};

export const showCreateModelItemDialog = (dispatch: AppDispatch, translation: TFunction<"translation">, fields: any, modelPackage: string, modelName: string) => {
    dispatch(openDialog({
        component: "CreateNewModelItemDialog",
        props: {
            title: translation('ADD_NEW_ROW'),
            fields: fields,
            modelPackage: modelPackage,
            modelName: modelName,
            onConfirm: () => {
                dispatch(closeDialog());
            },
            onCancel: () => {
                dispatch(closeDialog());
            }
        }
    }));
};