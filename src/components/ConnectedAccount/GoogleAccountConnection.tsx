import React, { useCallback } from 'react';

import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { showDisconnectGoogleDialog } from '@/components/DialogSystem/readyDialogs';
import GoogleButton from '@/components/GoogleButton/GoogleButton';
import { GoogleIcon } from '@/components/Icons/GoogleIcon';
import { GOOGLE_CLIENT_ID } from '@/config';
import { googleConnect } from '@/queries/account';
import { GoogleAccountInfo } from '@/queries/account/types';

interface GoogleAccountConnectionProps {
    connection: GoogleAccountInfo;
}

export const GoogleAccountConnection = (props: GoogleAccountConnectionProps) => {

    const { connection } = props;

    const { mutate } = googleConnect();

    const { t } = useTranslation();

    if (!connection) {
        return null;
    }

    const { connected = false, email = '' } = connection;

    const onDisconnectClick = useCallback(() => {
        showDisconnectGoogleDialog();
    }, [connected]);

    const onConnectWithGoogleAccount = useCallback((credentialResponse: any) => {
        mutate(credentialResponse);
    }, []);

    if (!connected) {
        return <Box w={'300px'}>
            <GoogleButton
                clientId={GOOGLE_CLIENT_ID}
                context={'signin'}
                customText={t('CONNECT_GOOGLE_ACCOUNT')}
                text={'signin_with'}
                onSuccess={onConnectWithGoogleAccount}/>
        </Box>;
    }

    return <Flex gap={'20px'} flexGrow={1}>
        <Flex direction={'column'} gap={'10px'}>
            <Flex align={'center'} gap={'10px'}>
                <GoogleIcon/>
                <Text fontSize={'15px'} fontWeight={'semibold'}>{'Google'}</Text>
            </Flex>
            {connected ? <Text fontSize={'sm'}>{email}</Text> : null}
        </Flex>
        <Button flexGrow={1} onClick={onDisconnectClick}>
            <Text mt={'1px'} fontSize={'13px'}>{t('DISCONNECT_SOCIAL_ACCOUNT')}</Text>
        </Button>
    </Flex>;
};