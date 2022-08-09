import React, {useCallback} from 'react';

import {Button} from '@chakra-ui/react';
import {closeDialog} from 'state/reducers/dialog/dialogSlice';

export const RegistrationCompleteDialog = ({ t, dispatch }) => {

    const onSignInClick = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    return <div className={'flex-grow flex items-end justify-end p-[20px] box-border w-full'}>
        <Button onClick={onSignInClick}>{"t('SIGN_IN')"}</Button>
    </div>;
};