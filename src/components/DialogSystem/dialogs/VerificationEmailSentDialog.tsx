import React, {useCallback} from "react";

import {confirmButtonTheme} from "components/DialogSystem/commonStyles";
import {Button} from "kuchkr-react-component-library";
import {closeDialog} from "state/reducers/dialog/dialogSlice";

export const VerificationEmailSentDialog = ({ t, dispatch }) => {

    const onSignInClick = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    return <div className={'flex-grow items-end justify-end p-[20px] box-border w-full'}>
        <Button theme={confirmButtonTheme} text={t('SIGN_IN')} onClick={onSignInClick}/>
    </div>;
};