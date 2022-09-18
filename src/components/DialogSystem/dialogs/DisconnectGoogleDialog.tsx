import React, {useCallback} from 'react';

import {Box, Flex, Text} from '@chakra-ui/react';
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

    const { isLoading, error, mutate } = googleDisconnect();

    const formConfig = useFormConfig('deleteAccount', t);

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

        <Form config={formConfig}
              error={error?.data}
              disabled={isLoading}
              onCancel={onCancelRequest}
              onSubmit={onSubmit}
              buttonsStackProps={{
                  gap: { base: 2, sm: 3, md: 3, lg: 3 },
              }}/>
        <DelayedTransition pending={isLoading}/>
    </Flex>;
};