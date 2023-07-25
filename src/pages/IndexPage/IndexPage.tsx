'use client';

import React, { useCallback } from 'react';

import { Center, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import { NavLink } from '@/components/chakra/NavLink/NavLink';
import Form from '@/components/Forms/Form/Form';
import { loginForm } from '@/components/Forms/formConfig';
import { LoginFormArgs } from '@/components/Forms/formConfig.types';
import { renderNonFieldErrors } from '@/components/Forms/util';
import GoogleButton from '@/components/GoogleButton/GoogleButton';
import { GOOGLE_CLIENT_ID, queryClient } from '@/config';
import WithAuth from '@/hoc/WithAuth';
import { googleLogin, login } from '@/queries/account';

const IndexPage = () => {

    const { t } = useTranslation();

    const {
        isIdle: googleLoginIdle,
        isLoading: googleLoginPending,
        error: googleLoginError,
        isSuccess: googleLoginSuccess,
        mutate: googleLoginMutate,
        reset: googleLoginReset
    } = googleLogin();

    const {
        isIdle: loginIdle,
        isLoading: loginPending,
        error: loginError,
        isSuccess: loginSuccess,
        mutate: loginMutate,
        reset: loginReset
    } = login();

    const attemptLogin = useCallback((formData: any) => {
        const { username_or_email, password } = formData;
        queryClient.removeQueries(['googleLogin']);
        googleLoginReset();
        loginMutate({ username_or_email, password });
    }, []);

    const onSignInWithGoogle = useCallback((credentialResponse: any) => {
        loginReset();
        googleLoginMutate(credentialResponse);
    }, []);

    return <Center w={'100%'} h={'100%'}>
        <Flex borderRadius={{ base: 0, sm: 8 }}
            direction={'column'}
            bg={'#2a2a2a'}
            width={{ base: '100%', sm: '400px' }}
            p={'40px'}
            gap={'30px'}>

            <Text textAlign={'center'} fontWeight={'bold'} fontSize={'2xl'}>{t('SIGN_IN_TO_YOUR_ACCOUNT')}</Text>

            <Form<LoginFormArgs>
                config={loginForm}
                submitButtonTextKey={'SIGN_IN'}
                error={loginError?.data}
                excludeErrors={['email_not_verified']}
                useCancelButton={false}
                onSubmit={attemptLogin}/>

            <NavLink color={'#77a4df'}
                fontSize={'md'}
                fontWeight={'semibold'}
                href={'/forgotPassword'}>
                <Text>{t('FORGOT_PASSWORD_QUESTION')}</Text>
            </NavLink>

            <GoogleButton
                clientId={GOOGLE_CLIENT_ID}
                context={'signin'}
                customText={t('CONTINUE_WITH_GOOGLE')}
                text={'signin'}
                useOneTap={true}
                onSuccess={onSignInWithGoogle}/>

            <Center mt={'-20px'}>
                {renderNonFieldErrors(googleLoginError?.data, t, [])}
            </Center>

            <div className={'flex flex-col items-center justify-center gap-[20px]'}>
                <Text fontSize={'md'} color={'#C7C7C7'}>{t('NEED_ACCOUNT')}</Text>
                <NavLink color={'#77a4df'}
                    fontSize={'md'}
                    fontWeight={'semibold'}
                    href={'/signup'}>
                    {t('CREATE_ACCOUNT')}
                </NavLink>
            </div>

            {(loginPending || googleLoginPending) &&
                <DelayedTransition pending={true}
                    position={'absolute'}
                    bottom={0}
                    left={0}
                    p={0} w={'100%'}/>}
        </Flex>
    </Center>;
};

export default WithAuth(IndexPage, {
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
}) as React.FC;