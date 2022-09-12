import React, {useCallback, useMemo} from 'react';

import {Box, Button, Flex, Text} from '@chakra-ui/react';
import {showPasswordCreationRequiredDialog} from 'components/DialogSystem/readyDialogs';
import GoogleButton from 'components/GoogleButton/GoogleButton';
import {GoogleIcon} from 'components/Icons/GoogleIcon';

import {GOOGLE_CLIENT_ID} from '../../config';
import {getUser, googleConnect, googleDisconnect} from '../../queries/account';

interface ConnectedAccountProps {
    supportedProvider: string;
    connections: string[];
}

const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const ConnectedAccount = (props: ConnectedAccountProps) => {

    const { supportedProvider, connections } = props;

    const { data: user } = getUser();

    const connected = connections.includes(supportedProvider);

    const isOnlySocial = user?.social.only_social;

    const {
        isIdle: googleDisconnectIdle,
        isLoading: googleDisconnectLoading,
        error: googleDisconnectError,
        isError: googleDisconnectIsError,
        isSuccess: googleDisconnectIsSuccess,
        mutate: googleDisconnectMutate
    } = googleDisconnect();

    const {
        isIdle: googleConnectIdle,
        isLoading: googleConnectLoading,
        error: googleConnectError,
        isSuccess: googleConnectIsSuccess,
        mutate: googleConnectMutate,
        reset: googleConnectReset
    } = googleConnect();

    const onDisconnectClick = useCallback(() => {

        if (isOnlySocial) {
            const title = connected ? 'DISCONNECT_ACCOUNT' : 'CONNECT_ACCOUNT';
            const message = connected ? 'DISCONNECT_ACCOUNT_MESSAGE' : 'CONNECT_ACCOUNT_MESSAGE';
            showPasswordCreationRequiredDialog(title, message);
        }
        else {
            googleDisconnectMutate({});
        }
    }, [isOnlySocial, connected]);

    const onConnectWithGoogleAccount = useCallback((credentialResponse: any) => {
        googleConnectMutate(credentialResponse);
    }, []);

    const renderButton = useMemo(() => {
        if (!connected) {
            return <Box w={'300px'}>
                <GoogleButton
                    clientId={GOOGLE_CLIENT_ID}
                    context={'signin'}
                    text={'signin_with'}
                    onSuccess={onConnectWithGoogleAccount}/>
            </Box>;
        }

        return <Button borderRadius={0} onClick={onDisconnectClick}>
            <Text mt={'1px'} fontSize={'13px'}>{'Disconnect'}</Text>
        </Button>;
    }, [connected]);

    return <Flex gap={'20px'}>
        <Flex direction={'column'} gap={'10px'}>
            <Flex align={'center'} gap={'10px'}>
                {connected && <GoogleIcon/>}
                {connected && <Text fontSize={'15px'} fontWeight={'semibold'}>
                    {capitalizeFirstLetter(supportedProvider)}
                </Text>}
            </Flex>
            {connected ? <Text fontSize={'sm'}>{user.email.email}</Text> : null}
        </Flex>
        {renderButton}
    </Flex>;
};