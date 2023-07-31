'use client';

import { FC, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { registrationForm } from '@/components/Forms/formConfig';
import { RegistrationFormArgs } from '@/components/Forms/formConfig.types';
import { NavLink } from '@/components/NavLink/NavLink';
import UserAgreements from '@/components/UserAgreements';
import WithAuth from '@/hoc/WithAuth';
import { register } from '@/queries/account';

const SignUpPage = () => {

    const { t } = useTranslation();

    const signUpQuery = register();

    const attemptRegister = useCallback((formData: any) => {
        const { email, username, password } = formData;
        signUpQuery.mutate({
            email: email,
            username: username,
            password: password
        });
    }, []);

    return <div className={'grid h-full w-full place-items-center'}>
        <div
            className={'flex w-full flex-col gap-[30px] rounded-none bg-[#2a2a2a] p-[40px] sm:w-[400px] sm:rounded-md'}>
            <h1 className={'text-center text-2xl font-semibold'}>
                {t('REGISTRATION')}
            </h1>

            <Form<RegistrationFormArgs>
                config={registrationForm}
                submitButtonTextKey={'SIGN_UP'}
                error={signUpQuery.error?.data}
                disabled={signUpQuery.isLoading}
                useCancelButton={false}
                onSubmit={attemptRegister}/>

            <div className={'flex flex-col items-center justify-center gap-[20px]'}>
                <div className={'text-[#C7C7C7]'}>
                    {t('ALREADY_HAVE_ACCOUNT')}
                </div>
                <NavLink className={'font-semibold text-[#77a4df]'} href={'/'}>
                    {t('SIGN_IN')}
                </NavLink>
            </div>

            <UserAgreements/>
            {signUpQuery.isLoading && <DelayedTransition
                pending={true}
                position={'absolute'}
                bottom={0}
                left={0}
                p={0} w={'100%'}/>}
        </div>
    </div>;
};

export default WithAuth(SignUpPage, {
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
}) as FC;