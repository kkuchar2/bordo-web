import React, {useCallback} from "react";

import {tryDeleteAccount} from "appRedux/reducers/api/account";
import {closeDialog, openDialog} from "appRedux/reducers/application";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {deleteAccountButtonTheme} from "./style";

const DeleteAccountButton = () => {

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const onDeleteAccountConfirmed = useCallback(() => {
        dispatch(closeDialog());
        dispatch(tryDeleteAccount());
    }, []);

    const onDeleteAccountCanceled = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    const deleteAccount = useCallback(() => {
        dispatch(openDialog({
            component: "DeleteAccountDialog",
            props: {
                title: t('DELETE_ACCOUNT'),
                description: t('DELETE_ACCOUNT_WARNING'),
                onConfirm: onDeleteAccountConfirmed,
                onCancel: onDeleteAccountCanceled,
            },
        }));
    }, []);

    return <Button theme={deleteAccountButtonTheme} text={t('DELETE_ACCOUNT')} onClick={deleteAccount}/>;
};

export default DeleteAccountButton;