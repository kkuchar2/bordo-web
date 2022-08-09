import React, {useCallback, useMemo} from 'react';

import {Button, HStack, Text, VStack} from '@chakra-ui/react';
import {showPasswordCreationRequiredDialog} from 'components/DialogSystem/readyDialogs';
import GoogleButton from 'components/GoogleButton/GoogleButton';
import {GoogleIcon} from 'components/Icons/GoogleIcon';
import {useSelector} from 'react-redux';
import {RootState} from 'state/store';

import {GOOGLE_CLIENT_ID} from '../../config';

interface ConnectedAccountProps {
    supportedProvider: string;
    connections: string[];
}

const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const ConnectedAccount = (props: ConnectedAccountProps) => {

    const { supportedProvider, connections } = props;

    const userState = useSelector((state: RootState) => state.account.user);

    const connected = connections.includes(supportedProvider);

    const isOnlySocial = userState.social.only_social;

    const onClick = useCallback(() => {

        if (isOnlySocial) {
            const title = connected ? 'DISCONNECT_ACCOUNT' : 'CONNECT_ACCOUNT';
            const message = connected ? 'DISCONNECT_ACCOUNT_MESSAGE' : 'CONNECT_ACCOUNT_MESSAGE';
            showPasswordCreationRequiredDialog(title, message);
        }
        else {
            // TODO
        }
    }, [userState, isOnlySocial, connected]);

    const renderButton = useMemo(() => {
        if (!connected) {
            return <GoogleButton
                clientId={GOOGLE_CLIENT_ID}
                context={'signin'}
                text={'signin_with'}
                onSuccess={() => {
                }}/>;
        }

        return <Button onClick={onClick}>
            <Text fontSize={'13px'}>{'Disconnect'}</Text>
        </Button>;
    }, [connected]);

    return <HStack spacing={'20px'} w={'100%'}>
        <GoogleIcon/>
        <VStack flexGrow={1} spacing={0} align={'stretch'}>
            <Text fontSize={'lg'}>{capitalizeFirstLetter(supportedProvider)}</Text>
            {connected ? <Text fontSize={'xs'}>{userState.email.email}</Text> : null}
        </VStack>
        {renderButton}
    </HStack>;
};