import React, {useCallback} from "react";

import {closeDialog} from "appRedux/reducers/application";
import {useAppDispatch} from "appRedux/store";
import {confirmButtonTheme} from "components/DialogSystem/commonStyles";
import {Button} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";

export const VerificationEmailSentDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const onSignInClick = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    return <div className={'flex-grow items-end justify-end p-[20px] box-border w-full'}>
        <Button theme={confirmButtonTheme} text={t('SIGN_IN')} onClick={onSignInClick}/>
    </div>;
};