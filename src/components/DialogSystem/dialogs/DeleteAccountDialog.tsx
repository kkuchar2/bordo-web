import React, {useCallback, useEffect} from 'react';

import {Box, Text, VStack} from '@chakra-ui/react';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import Form from 'components/Forms/Form/Form';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';
import {closeDialog} from 'state/reducers/dialog/dialogSlice';
import {useAppDispatch} from 'state/store';

import {useFormConfig} from '../../../api/formConfig';
import {deleteAccount} from '../../../queries/account';

export const DeleteAccountDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const { isLoading, error, data, isSuccess, mutate } = deleteAccount();

    const formConfig = useFormConfig('deleteAccount', t);

    const onSubmit = useCallback((formData: any) => {
        mutate({ ...formData });
    }, []);

    const onCancelRequest = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(closeDialog());
            navigate('/');
        }
    }, [isSuccess]);

    return <VStack align={'stretch'} spacing={5} p={3}>
        <Box p={4} bg={'rgba(230,52,52,0.18)'} border={`1px solid ${'rgba(230,52,52,0.47)'}`}>
            <Text fontWeight={'semibold'} fontSize={'sm'}>{t('DELETE_ACCOUNT_WARNING')}</Text>
        </Box>

        <Form config={formConfig}
              error={error?.data}
              disabled={isLoading}
              onCancel={onCancelRequest}
              onSubmit={onSubmit}/>
        <DelayedTransition pending={isLoading}/>
    </VStack>;
};