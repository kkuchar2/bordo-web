import React, {useCallback, useMemo} from "react";

import {useAuthSelector} from "appRedux/reducers/api/auth/accountSlice";
import {showPasswordCreationRequiredDialog} from "components/DialogSystem/readyDialogs";
import GoogleButton from "components/GoogleButton/GoogleButton";

import {GOOGLE_CLIENT_ID} from "../../config";

interface ConnectedAccountProps {
    supportedProvider: string;
    connections: string[];
}

const capitalizeFirstLetter = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const ConnectedAccount = (props: ConnectedAccountProps) => {

    const { supportedProvider, connections } = props;

    const userState = useAuthSelector('user');

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
            return <div>
                <GoogleButton
                    clientId={GOOGLE_CLIENT_ID}
                    context={'signin'}
                    text={'signin_with'}
                    onSuccess={() => {
                    }}/>
            </div>;
        }

        return <button className={'social_connection'} onClick={onClick}>
            Disconnect
        </button>;
    }, [connected]);

    return <div className={'flex items-center justify-start w-full'}>
        <div className={'flex items-start justify-center flex-col grow'}>
            <div className={'text-white text-[20px]'}>{capitalizeFirstLetter(supportedProvider)}</div>
            {connected ? <div className={'text-white/70 text-[14px]'}>{userState.email.email}</div> : null}
        </div>

        {renderButton}
    </div>;
};