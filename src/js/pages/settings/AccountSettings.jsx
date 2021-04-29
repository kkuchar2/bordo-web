import React, {useCallback} from "react";
import {useDispatch} from "react-redux";

import Button from "components/Button";
import {showDialog} from "redux/reducers/application";
import {tryDeleteAccount} from "redux/reducers/api/account";

import "styles/pages/settings/AccountSettings.scss";

function AccountSettings() {

    const dispatch = useDispatch();

    const openDeleteAccountConfirmationDialog = useCallback(() => {
        dispatch(showDialog({
            title: "Are you sure?",
            content: "All user data will be permanently removed",
            onConfirm: () => dispatch(tryDeleteAccount())
        }));
    }, []);

    return <div className={"accountSettings"}>
        <div>Account settings</div>
        <Button onClick={openDeleteAccountConfirmationDialog} className={"deleteAccountButton"} text={"Delete account"}/>
    </div>;
}

export default AccountSettings;