import React, {useCallback} from "react";

import {confirmButtonTheme} from "components/DialogSystem/commonStyles";
import {Button} from "kuchkr-react-component-library";
import {closeDialog} from "state/reducers/dialog/dialogSlice";

export const RegistrationCompleteDialog = ({ t, dispatch }) => {

    const onSignInClick = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    return <div className={'flex-grow flex items-end justify-end p-[20px] box-border w-full'}>
        <Button theme={confirmButtonTheme} text={t('SIGN_IN')} onClick={onSignInClick}/>
    </div>;
};