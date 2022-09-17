import React, {useCallback} from 'react';

import {Box, Button, Flex, Text} from '@chakra-ui/react';
import {showDisconnectGoogleDialog} from 'components/DialogSystem/readyDialogs';
import GoogleButton from 'components/GoogleButton/GoogleButton';
import {GoogleIcon} from 'components/Icons/GoogleIcon';

import {GOOGLE_CLIENT_ID} from '../../config';
import {googleConnect} from '../../queries/account';
import {GoogleAccountInfo} from '../../queries/account/types';

interface GoogleAccountConnectionProps {
    connection: GoogleAccountInfo | null;
}

export const GoogleAccountConnection = (props: GoogleAccountConnectionProps) => {

    const { connection } = props;

    const { isLoading, error, isSuccess, mutate, reset } = googleConnect();

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
                customText={'Connect Google Account'}
                text={'signin_with'}
                onSuccess={onConnectWithGoogleAccount}/>
        </Box>;
    }

    return <Flex gap={'20px'}>
        <Flex direction={'column'} gap={'10px'}>
            <Flex align={'center'} gap={'10px'}>
                <GoogleIcon/>
                <Text fontSize={'15px'} fontWeight={'semibold'}>{'Google'}</Text>
            </Flex>
            {connected ? <Text fontSize={'sm'}>{email}</Text> : null}
        </Flex>
        <Button onClick={onDisconnectClick}>
            <Text mt={'1px'} fontSize={'13px'}>{'Disconnect'}</Text>
        </Button>
    </Flex>;
};