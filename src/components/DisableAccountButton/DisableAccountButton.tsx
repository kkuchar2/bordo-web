import React, {useCallback} from "react";

import { useAppDispatch } from "appRedux/store";
import { showDisableAccountDialog} from "components/Dialogs/readyDialogs";
import {disableAccountButtonTheme} from "components/DisableAccountButton/style";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

const DisableAccountButton = () => {

    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const openDisableAccountDialog = useCallback(() => {
        showDisableAccountDialog({dispatch, translation: t});
    }, []);

    return <Button theme={disableAccountButtonTheme} text={t('DISABLE_ACCOUNT')} onClick={openDisableAccountDialog}/>;
};

export default DisableAccountButton;