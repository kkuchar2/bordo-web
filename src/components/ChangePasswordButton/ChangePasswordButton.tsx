import React, {useCallback} from "react";

import {useAppDispatch} from "appRedux/store";
import {buttonTheme} from "components/ChangePasswordButton/style";
import {showChangePasswordDialog} from "components/Dialogs/readyDialogs";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

const ChangePasswordButton = () => {

    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const onClick = useCallback(() => {
        showChangePasswordDialog({ dispatch, translation: t });
    }, [t]);

    return <Button theme={buttonTheme} text={t('CHANGE_PASSWORD')} onClick={onClick}/>;
};

export default ChangePasswordButton;