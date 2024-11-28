'use client';

import React, { useCallback } from 'react';

import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { loginForm } from '@/components/Forms/formConfig';
import { LoginFormArgs } from '@/components/Forms/formConfig.types';
import { NavLink } from '@/components/NavLink/NavLink';
import { getUser, login } from '@/queries/account';

const IndexPage = () => {

    const { t } = useTranslation();

    const loginQuery = login();
    const userQuery = getUser();

    const attemptLogin = useCallback(async (formData: LoginFormArgs) => {
        loginQuery.mutate(formData);
    }, []);

    if (userQuery.isSuccess && userQuery.data) {
        console.log('redirecting to /home');
        return redirect('/home');
    }

    if (userQuery.isFetching) {
        return null;
    }

    console.log('loginQuery', loginQuery);

    return <div className={'grid size-full place-items-center'}>
        <div className={'flex w-full flex-col gap-[30px] bg-[#2a2a2a] p-[40px] sm:w-[400px] sm:rounded-md'}>

            <div className={'text-center text-2xl font-bold'}>
                {t('SIGN_IN_TO_YOUR_ACCOUNT')}
            </div>

            <Form<LoginFormArgs>
                config={loginForm}
                submitButtonTextKey={'SIGN_IN'}
                disabled={loginQuery.isPending}
                submitButtonClassName={'bg-[#77a4df]/80 hover:bg-[#77a4df] text-white py-2 px-4 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed'}
                validationResponse={loginQuery?.error?.validationResponse}
                useCancelButton={false}
                onSubmit={attemptLogin}/>

            <NavLink className={'font-semibold text-[#77a4df]'} href={'/forgotPassword'}>
                {t('FORGOT_PASSWORD_QUESTION')}
            </NavLink>

            <div className={'flex flex-col items-center justify-center gap-[20px]'}>
                <div className={'text-[#C7C7C7]'}>
                    {t('NEED_ACCOUNT')}
                </div>
                <NavLink className={'font-semibold text-[#77a4df]'} href={'/signup'}>
                    {t('CREATE_ACCOUNT')}
                </NavLink>
            </div>

            <DelayedTransition pending={loginQuery.isPending}/>
        </div>
    </div>;
};

export default IndexPage;