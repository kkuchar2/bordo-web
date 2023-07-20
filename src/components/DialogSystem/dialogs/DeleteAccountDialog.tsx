import React, { useCallback, useEffect } from 'react';

import { Box, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { useFormConfig } from '@/form/formConfig';
import { deleteAccount } from '@/queries/account';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { useAppDispatch } from '@/state/store';

export const DeleteAccountDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const router = useRouter();

    const { isLoading, error, isSuccess, mutate } = deleteAccount();

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
            router.push('/');
        }
    }, [isSuccess]);

    return <VStack align={'stretch'} spacing={5}>
        <Box p={4} bg={'rgba(230,52,52,0.18)'} border={`1px solid ${'rgba(230,52,52,0.47)'}`}>
            <Text fontWeight={'semibold'} fontSize={'sm'}>{t('DELETE_ACCOUNT_WARNING')}</Text>
        </Box>

        <Form config={formConfig}
            error={error?.data}
            disabled={isLoading}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}
            buttonsStackProps={{
                gap: { base: 2, sm: 3, md: 3, lg: 3 },
            }}/>
        <DelayedTransition pending={isLoading}/>
    </VStack>;
};