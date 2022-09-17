import React, {useCallback} from 'react';

import {Box, Text, VStack} from '@chakra-ui/react';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import Form from 'components/Forms/Form/Form';
import {useTranslation} from 'react-i18next';
import {closeDialog} from 'state/reducers/dialog/dialogSlice';
import {useAppDispatch} from 'state/store';

import {useFormConfig} from '../../../api/formConfig';
import {googleDisconnect} from '../../../queries/account';

export const DisconnectGoogleDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const {
        isIdle: googleDisconnectIdle,
        isLoading: googleDisconnectLoading,
        error: googleDisconnectError,
        isError: googleDisconnectIsError,
        isSuccess: googleDisconnectIsSuccess,
        mutate: googleDisconnectMutate
    } = googleDisconnect();

    const formConfig = useFormConfig('deleteAccount', t);

    const onSubmit = useCallback((formData: any) => {
        googleDisconnectMutate({ ...formData });
    }, []);

    const onCancelRequest = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    return <VStack align={'stretch'} spacing={5} p={3}>
        <Box p={4} bg={'rgba(230,52,52,0.18)'} border={`1px solid ${'rgba(230,52,52,0.47)'}`}>
            <Text fontWeight={'semibold'} fontSize={'sm'}>{t('DISCONNECT_GOOGLE_ACCOUNT_WARNING')}</Text>
        </Box>

        <Form config={formConfig}
              error={googleDisconnectError?.data}
              disabled={googleDisconnectLoading}
              onCancel={onCancelRequest}
              onSubmit={onSubmit}
              buttonsStackProps={{
                  gap: { base: 2, sm: 3, md: 3, lg: 3 },
              }}/>
        <DelayedTransition pending={googleDisconnectLoading}/>
    </VStack>;
};