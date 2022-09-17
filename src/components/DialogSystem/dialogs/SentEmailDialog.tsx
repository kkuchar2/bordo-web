import React, {useCallback} from 'react';

import {Button, Flex} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {closeDialog} from 'state/reducers/dialog/dialogSlice';
import {BaseDialogProps, DialogProps} from 'state/reducers/dialog/dialogSlice.types';

export interface SentEmailDialogProps {
    showSignInButton: boolean;
    showGotItButton: boolean;
}

export const SentEmailDialog = (props: BaseDialogProps & DialogProps<SentEmailDialogProps>) => {

    const { dialog, data, dispatch, t } = props;

    const { showSignInButton = false, showGotItButton = true } = data;

    const navigate = useNavigate();

    const onSignInClick = useCallback(() => {
        dispatch(closeDialog());
        navigate('/');
    }, []);

    const onGotItClick = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    return <Flex w={'100%'} align={'flex-end'} justify={'flex-end'} p={'10px'}>
        {showSignInButton && <Button onClick={onSignInClick}>{t('SIGN_IN')}</Button>}
        {showGotItButton && <Button onClick={onGotItClick}>{t('GOT_IT')}</Button>}
    </Flex>;
};