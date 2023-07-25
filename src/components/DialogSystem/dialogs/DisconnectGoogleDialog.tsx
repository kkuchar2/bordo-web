import React, { useCallback } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { deleteAccountForm } from '@/components/Forms/formConfig';
import { DeleteAccountFormArgs } from '@/components/Forms/formConfig.types';
import { googleDisconnect } from '@/queries/account';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { useAppDispatch } from '@/state/store';

export const DisconnectGoogleDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const { isLoading, error, mutate } = googleDisconnect();

    const onSubmit = useCallback((formData: any) => {
        mutate({ ...formData });
    }, []);

    const onCancelRequest = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    return <Flex direction={'column'} gap={'20px'}>
        <Box p={4} bg={'rgba(230,52,52,0.18)'} border={`1px solid ${'rgba(230,52,52,0.47)'}`}>
            <Text fontWeight={'semibold'} fontSize={'sm'}>{t('DISCONNECT_GOOGLE_ACCOUNT_WARNING')}</Text>
        </Box>

        <Form<DeleteAccountFormArgs>
            config={deleteAccountForm}
            error={error?.data}
            disabled={isLoading}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}/>
        <DelayedTransition pending={isLoading}/>
    </Flex>;
};