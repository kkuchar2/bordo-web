'use client';

import React, { useCallback } from 'react';

import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { registrationForm } from '@/components/Forms/formConfig';
import { RegistrationFormArgs } from '@/components/Forms/formConfig.types';
import { NavLink } from '@/components/NavLink/NavLink';
import { getUser, register } from '@/queries/account';

const SignUpPage = () => {

    const { t } = useTranslation();

    const registerQuery = register();
    const userQuery = getUser();

    const signUp = useCallback(async (formData: RegistrationFormArgs) => {
        registerQuery.mutate(formData);
    }, []);

    if (userQuery.isSuccess && userQuery.data) {
        return redirect('/home');
    }

    return <div className={'grid size-full place-items-center'}>
        <div
            className={'flex w-full flex-col gap-[30px] rounded-none bg-[#2a2a2a] p-[40px] sm:w-[400px] sm:rounded-md'}>
            <h1 className={'text-center text-2xl font-semibold'}>
                {t('REGISTRATION')}
            </h1>

            <Form<RegistrationFormArgs>
                config={registrationForm}
                submitButtonTextKey={'SIGN_UP'}
                validationResponse={registerQuery?.error?.validationResponse}
                disabled={registerQuery.isPending}
                useCancelButton={false}
                onSubmit={signUp}/>

            <div className={'flex flex-col items-center justify-center gap-[20px]'}>
                <div className={'text-[#C7C7C7]'}>
                    {t('ALREADY_HAVE_ACCOUNT')}
                </div>
                <NavLink className={'font-semibold text-[#77a4df]'} href={'/'}>
                    {t('SIGN_IN')}
                </NavLink>
            </div>

            <div className={'flex grow flex-col justify-end'}>
                <div className={'text-center text-sm'}>
                    {t('USER_AGREEMENTS')}
                    <NavLink className={'p-2 font-semibold text-white'} href={'/userAgreement'}>
                        {t('MORE')}
                    </NavLink>
                </div>
            </div>

            <DelayedTransition pending={registerQuery.isPending}/>
        </div>
    </div>;
};

export default SignUpPage;