import React, {useCallback} from "react";

import {tryDeleteAccount} from "appRedux/reducers/api/account";
import {closeDialog, openDialog} from "appRedux/reducers/application";
import {Button} from "kuchkr-react-component-library";
import {useDispatch} from "react-redux";

import {deleteAccountButtonTheme} from "./style";

const DeleteAccountButton = () => {

    const dispatch = useDispatch();

    const onDeleteAccountConfirmed = useCallback(() => {
        dispatch(closeDialog());
        dispatch(tryDeleteAccount());
    }, []);

    const onDeleteAccountCanceled = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    const deleteAccount = useCallback(() => {
        dispatch(openDialog({
            component: "ConfirmationDialog",
            props: {
                title: 'Delete account',
                description: 'All data associated with this account will be deleted',
                onConfirm: onDeleteAccountConfirmed,
                onCancel: onDeleteAccountCanceled,
            },
        }));
    }, []);

    return <Button theme={deleteAccountButtonTheme} text={"Delete Account"} onClick={deleteAccount}/>;
};

export default DeleteAccountButton;