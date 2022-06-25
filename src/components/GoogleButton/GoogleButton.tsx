import React, {useCallback, useState} from "react";

import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";

interface GoogleButtonProps {
    clientId: string;
    context?: 'signin' | 'signup' | 'use';
    text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
    onSuccess?: (credentialResponse: CredentialResponse) => void
    onError?: () => void;
    className?: string;
}

const GoogleButton = (props: GoogleButtonProps) => {

    const { clientId, text, onSuccess, onError, className } = props;

    const [width, setWidth] = useState(null);

    const div = useCallback(node => {
        if (node !== null) {
            setWidth(node.getBoundingClientRect().width);
        }
    }, []);

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

    return <div className={className} ref={div}>
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                useOneTap={false}
                auto_select={true}
                width={`${width}`}
                theme={"filled_black"}
                size={"large"}
                shape={"rectangular"}
                text={text}
                locale={'en'}
                context={'signup'}
                ux_mode={"popup"}
                onSuccess={innerOnSuccess}
                onError={innerOnError}/>
        </GoogleOAuthProvider>
    </div>;
};

GoogleButton.defaultProps = {
    context: 'signin',
    className: '',
    text: 'signin_with'
};

export default GoogleButton;