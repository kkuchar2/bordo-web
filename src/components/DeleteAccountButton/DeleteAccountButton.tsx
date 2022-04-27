import React, {useCallback} from "react";

import {useAppDispatch} from "appRedux/store";
import {showDeleteAccountDialog} from "components/Dialogs/readyDialogs";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

import {deleteAccountButtonTheme} from "./style";

const DeleteAccountButton = () => {

    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const openDeleteAccountDialog = useCallback(() => {
        showDeleteAccountDialog({dispatch, translation: t});
    }, []);

    return <Button theme={deleteAccountButtonTheme} text={t('DELETE_ACCOUNT')} onClick={openDeleteAccountDialog}/>;
};

export default DeleteAccountButton;