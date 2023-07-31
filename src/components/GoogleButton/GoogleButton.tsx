import React, { useCallback } from 'react';

import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useTranslation } from 'react-i18next';

interface GoogleButtonProps {
    clientId: string;
    context?: 'signin' | 'signup' | 'use';
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    onSuccess?: (credentialResponse: CredentialResponse) => void
    onError?: () => void;
    useOneTap?: boolean;
    customText?: string;
    width?: string;
}

const GoogleButton = (props: GoogleButtonProps) => {

    const {
        clientId,
        text,
        onSuccess,
        onError,
        useOneTap = false,
        width,
    } = props;

    const { i18n } = useTranslation();

    const innerOnSuccess = useCallback((credentialResponse: CredentialResponse) => {
        if (onSuccess) {
            onSuccess(credentialResponse);
        }
    }, [onSuccess]);

    const innerOnError = useCallback(() => {
        console.error('Google login error');
        if (onError) {
            onError();
        }
    }, [onError]);

    return <div className={'flex items-center justify-center'}>
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                useOneTap={useOneTap}
                theme={'filled_black'}
                size={'large'}
                shape={'rectangular'}
                text={text}
                locale={i18n.language}
                type={'standard'}
                context={'signin'}
                ux_mode={'popup'}
                onSuccess={innerOnSuccess}
                onError={innerOnError}/>
        </GoogleOAuthProvider>
    </div>;
};

export default GoogleButton;