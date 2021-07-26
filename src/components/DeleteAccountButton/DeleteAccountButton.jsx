import {tryDeleteAccount} from "appRedux/reducers/api/account";
import {hide_dialog, hideDialog, showDialog} from "appRedux/reducers/application";
import {deleteAccountButtonTheme} from "components/DeleteAccountButton/style.js";
import {Button} from "kuchkr-react-component-library";
import React, {useCallback} from "react";
import {useDispatch} from "react-redux";

const DeleteAccountButton = props => {

    const dispatch = useDispatch();

    const onDeleteAccountConfirmed = useCallback(() => {
        dispatch(hideDialog());
        dispatch(tryDeleteAccount());
    }, []);

    const onDeleteAccountCanceled = useCallback(() => {
        dispatch(hideDialog());
    }, []);

    const deleteAccount = useCallback(() => {
        dispatch(showDialog({
            title: 'Delete account',
            description: 'All data associated with this account will be deleted',
            onConfirm: onDeleteAccountConfirmed,
            onCancel: onDeleteAccountCanceled,
        }));
    }, []);

    return <Button theme={deleteAccountButtonTheme} text={"Delete Account"} onClick={deleteAccount}/>;
};

export default DeleteAccountButton;