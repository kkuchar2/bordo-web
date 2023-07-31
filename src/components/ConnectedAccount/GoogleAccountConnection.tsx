import React, { useCallback } from 'react';

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
        return <div className={'w-[300px]'}>
            <GoogleButton
                clientId={GOOGLE_CLIENT_ID}
                context={'signin'}
                customText={t('CONNECT_GOOGLE_ACCOUNT')}
                text={'signin_with'}
                onSuccess={onConnectWithGoogleAccount}/>
        </div>;
    }

    return <div className={'flex gap-[20px]'}>
        <div className={'flex flex-col gap-[10px]'}>
            <div className={'flex items-center gap-[10px]'}>
                <GoogleIcon/>
                <div className={'font-semibold'}>
                    {'Google'}
                </div>
            </div>
            {connected && <div className={'text-sm'}>
                {email}
            </div>}
        </div>
        <div>
            <button className={'rounded-full bg-white/5 px-3 py-2 text-sm font-semibold hover:bg-white/30'}
                onClick={onDisconnectClick}>
                {t('DISCONNECT_ACCOUNT')}
            </button>
        </div>
    </div>;
};