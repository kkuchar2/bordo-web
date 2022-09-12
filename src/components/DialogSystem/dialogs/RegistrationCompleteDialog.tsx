import React, {useCallback} from 'react';

import {Button, Flex} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import {closeDialog} from 'state/reducers/dialog/dialogSlice';

export const RegistrationCompleteDialog = ({ t, dispatch }) => {

    const navigate = useNavigate();

    const onSignInClick = useCallback(() => {
        dispatch(closeDialog());
        navigate('/');
    }, []);

    return <Flex w={'100%'} align={'flex-end'} justify={'flex-end'} p={'10px'}>
        <Button onClick={onSignInClick}>{t('SIGN_IN')}</Button>
    </Flex>;
};