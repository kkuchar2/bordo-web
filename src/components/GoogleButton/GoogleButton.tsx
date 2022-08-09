import React, {useCallback} from 'react';

import {Center} from '@chakra-ui/react';
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
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

    const onPromptMomentNotification = useCallback((v) => {
        console.log('Google login prompt moment notification', v);
    }, []);

    const targetWidth = bounds.width === 0 ? 200 : bounds.width > 400 ? 400 : bounds.width;

    console.log('targetWidth', targetWidth);

    return <Center className={className} style={{ colorScheme: 'light' }} ref={ref}>
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                useOneTap={false}
                auto_select={true}
                width={`${targetWidth}`}
                theme={'filled_black'}
                size={'large'}
                shape={'rectangular'}
                text={text}
                locale={'en'}
                type={'standard'}
                context={'signup'}
                ux_mode={'popup'}
                promptMomentNotification={onPromptMomentNotification}
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