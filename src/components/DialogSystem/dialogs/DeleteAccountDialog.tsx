import React, { useCallback, useEffect } from 'react';

import { Box, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { deleteAccountForm } from '@/components/Forms/formConfig';
import { DeleteAccountFormArgs } from '@/components/Forms/formConfig.types';
import { deleteAccount } from '@/queries/account';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { useAppDispatch } from '@/state/store';

export const DeleteAccountDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const deleteAccountQuery = deleteAccount();

    const onSubmit = useCallback((formData: DeleteAccountFormArgs) => {
        deleteAccountQuery.mutate({ ...formData });
    }, []);

    const onCancelRequest = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    useEffect(() => {
        if (deleteAccountQuery.isSuccess) {
            dispatch(closeDialog());
        }
    }, [deleteAccountQuery.isSuccess]);

    return <VStack align={'stretch'} spacing={5}>
        <Box p={4} bg={'rgba(230,52,52,0.18)'} border={`1px solid ${'rgba(230,52,52,0.47)'}`}>
            <Text fontWeight={'semibold'} fontSize={'sm'}>{t('DELETE_ACCOUNT_WARNING')}</Text>
        </Box>

        <Form<DeleteAccountFormArgs>
            config={deleteAccountForm}
            error={deleteAccountQuery.error?.data}
            disabled={deleteAccountQuery.isLoading}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}
            initialValues={{
                current_password: '',
            }}
        />
        <DelayedTransition pending={deleteAccountQuery.isLoading}/>
    </VStack>;
};