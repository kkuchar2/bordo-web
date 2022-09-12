import React, {useCallback} from 'react';

import {Box, Center} from '@chakra-ui/react';
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import {useTranslation} from 'react-i18next';
import {useMeasure} from 'react-use';

interface GoogleButtonProps {
    clientId: string;
    disabled?: boolean;
    context?: 'signin' | 'signup' | 'use';
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    onSuccess?: (credentialResponse: CredentialResponse) => void
    onError?: () => void;
    className?: string;
}

const GoogleButton = (props: GoogleButtonProps) => {

    const { clientId, text, onSuccess, onError, disabled, className } = props;

    const [ref, bounds] = useMeasure();

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
    const targetWidth = bounds.width === 0 ? 200 : bounds.width > 400 ? 400 : bounds.width;

    return <Center opacity={disabled ? 0.3 : 1} className={className} position={'relative'}
                   style={{ colorScheme: 'light' }} ref={ref}>
        {disabled ? <Box
            w={'100%'}
            h={'100%'}
            bg={'rgba(255,255,255,0)'}
            position={'absolute'}
            top={0}
            left={0}
            zIndex={1}/> : null}
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                useOneTap={false}
                auto_select={true}
                width={`${targetWidth}`}
                theme={'filled_black'}
                size={'large'}
                shape={'rectangular'}
                text={text}
                logo_alignment={'left'}
                locale={i18n.language}
                type={'standard'}
                context={'signup'}
                ux_mode={'popup'}
                onSuccess={innerOnSuccess}
                onError={innerOnError}/>
        </GoogleOAuthProvider>
    </Center>;
};

GoogleButton.defaultProps = {
    context: 'signin',
    className: '',
    text: 'signin_with'
};

export default GoogleButton;