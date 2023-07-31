'use client';

import React, { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { loginForm } from '@/components/Forms/formConfig';
import { LoginFormArgs } from '@/components/Forms/formConfig.types';
import { renderNonFieldErrors } from '@/components/Forms/util';
import GoogleButton from '@/components/GoogleButton/GoogleButton';
import { NavLink } from '@/components/NavLink/NavLink';
import { GOOGLE_CLIENT_ID, queryClient } from '@/config';
import WithAuth from '@/hoc/WithAuth';
import { googleLogin, login } from '@/queries/account';

const IndexPage = () => {

    const { t } = useTranslation();

    const googleLoginQuery = googleLogin();

    const loginQuery = login();

    const attemptLogin = useCallback((formData: any) => {
        const { username_or_email, password } = formData;
        queryClient.removeQueries(['googleLogin']);
        googleLoginQuery.reset();
        loginQuery.mutate({ username_or_email, password });
    }, []);

    const onSignInWithGoogle = useCallback((credentialResponse: any) => {
        loginQuery.reset();
        googleLoginQuery.mutate(credentialResponse);
    }, []);

    return <div className={'grid h-full w-full place-items-center'}>
        <div className={'flex w-full flex-col gap-[30px] bg-[#2a2a2a] p-[40px] sm:w-[400px] sm:rounded-md'}>

            <div className={'text-center text-2xl font-bold'}>
                {t('SIGN_IN_TO_YOUR_ACCOUNT')}
            </div>

            <Form<LoginFormArgs>
                config={loginForm}
                submitButtonTextKey={'SIGN_IN'}
                error={loginQuery.error?.data}
                excludeErrors={['email_not_verified']}
                useCancelButton={false}
                onSubmit={attemptLogin}/>

            <NavLink className={'font-semibold text-[#77a4df]'} href={'/forgotPassword'}>
                {t('FORGOT_PASSWORD_QUESTION')}
            </NavLink>

            <GoogleButton
                clientId={GOOGLE_CLIENT_ID}
                context={'signin'}
                width={'320'}
                customText={t('CONTINUE_WITH_GOOGLE')}
                text={'signin'}
                useOneTap={true}
                onSuccess={onSignInWithGoogle}/>

            <div className={'mt-[-20px] grid place-items-center'}>
                {renderNonFieldErrors(googleLoginQuery.error?.data, t, [])}
            </div>

            <div className={'flex flex-col items-center justify-center gap-[20px]'}>
                <div className={'text-[#C7C7C7]'}>
                    {t('NEED_ACCOUNT')}
                </div>
                <NavLink className={'font-semibold text-[#77a4df]'} href={'/signup'}>
                    {t('CREATE_ACCOUNT')}
                </NavLink>
            </div>

            {(loginQuery.isLoading || googleLoginQuery.isLoading) &&
                <DelayedTransition pending={true}
                    position={'absolute'}
                    bottom={0}
                    left={0}
                    p={0} w={'100%'}/>}
        </div>
    </div>;
};

export default WithAuth(IndexPage, {
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
}) as React.FC;