import React, {useCallback, useState} from 'react';

import {Box, Flex, Text} from '@chakra-ui/react';
import {CredentialResponse, GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import {GoogleIcon} from 'components/Icons/GoogleIcon';
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
    useOneTap?: boolean;
    customText?: string;
}

const GoogleButton = (props: GoogleButtonProps) => {

    const {
        clientId,
        text,
        onSuccess,
        onError,
        disabled,
        useOneTap = false,
        customText = 'Sign in with Google',
        className
    } = props;

    const [ref, bounds] = useMeasure();
    const [hovered, setHovered] = useState(false);

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

    const onMouseEnter = useCallback(() => {
        setHovered(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setHovered(false);
    }, []);

    const targetWidth = bounds.width === 0 ? 200 : bounds.width > 400 ? 400 : bounds.width;

    return <Flex opacity={disabled ? 0.3 : 1} className={className} position={'relative'} w={'100%'}
                 align={'center'} justify={'center'}
                 style={{ colorScheme: 'foo' }}>
        {disabled ? <Box
            w={'100%'}
            h={'100%'}
            bg={'rgba(255,255,255,0)'}
            position={'absolute'}
            top={0}
            left={0}
            zIndex={1}/> : null}
        <GoogleOAuthProvider clientId={clientId}
                             onScriptLoadSuccess={() => {
                                 console.log('Google script loaded');
                             }}>
            <Flex position={'relative'}
                  boxSizing={'border-box'}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  align={'center'}
                  pl={'12px'}
                  ref={ref}
                  pr={'10px'}
                  w={'100%'}
                  h={'50px'}>

                <Flex align={'center'} justify={'center'} position={'absolute'} top={0} left={0} w={'100%'}
                      h={'100%'}
                      zIndex={1}
                      gap={'10px'}
                      borderRadius={'10px'}
                      bg={hovered ? '#202020' : '#191919'}
                      pointerEvents={'none'}>
                    <GoogleIcon/>
                    <Text fontWeight={'semibold'}>{customText}</Text>
                </Flex>
                <GoogleLogin
                    useOneTap={useOneTap}
                    width={`${targetWidth}`}
                    theme={'filled_black'}
                    size={'large'}
                    shape={'pill'}
                    text={text}
                    locale={i18n.language}
                    type={'standard'}
                    context={'signin'}
                    ux_mode={'popup'}
                    onSuccess={innerOnSuccess}
                    onError={innerOnError}/>
            </Flex>
        </GoogleOAuthProvider>
    </Flex>;
};

GoogleButton.defaultProps = {
    context: 'signin',
    className: '',
    text: 'signin_with'
};

export default GoogleButton;