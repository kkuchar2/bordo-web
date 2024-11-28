'use client';

import { useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { showDialogAfterPasswordResetRequest } from '@/components/DialogSystem/readyDialogs';
import Form from '@/components/Forms/Form/Form';
import { forgotPasswordForm } from '@/components/Forms/formConfig';
import { EmailArgs } from '@/components/Forms/formConfig.types';
import { NavLink } from '@/components/NavLink/NavLink';
import { forgotPassword } from '@/queries/account';

const ForgotPassword = () => {

    const forgotPasswordQuery = forgotPassword();

    const { t } = useTranslation();

    const requestPasswordReset = useCallback((formData: any) => {
        const { email } = formData;
        forgotPasswordQuery.mutate({
            email: email,
        });
    }, []);

    useEffect(() => {
        if (forgotPasswordQuery.isSuccess) {
            showDialogAfterPasswordResetRequest();
        }

    }, [forgotPasswordQuery.isSuccess, t]);

    return <div className={'grid size-full place-items-center'}>
        <div className={'rounded-0 flex w-full flex-col gap-[40px] bg-[#2a2a2a] p-[40px] sm:w-[400px] sm:rounded-md'}>
            <div className={'flex flex-col gap-[20px]'}>
                <Form<EmailArgs>
                    config={forgotPasswordForm}
                    title={t('RESET_PASSWORD')}
                    description={t('RESET_PASSWORD_DESCRIPTION')}
                    submitButtonTextKey={'RESET_PASSWORD'}
                    validationResponse={forgotPasswordQuery?.error?.validationResponse}
                    disabled={forgotPasswordQuery.isPending}
                    useCancelButton={false}
                    onSubmit={requestPasswordReset}
                />

                <div className={'flex flex-col items-center justify-center gap-[20px]'}>
                    <NavLink className={'font-semibold text-[#77a4df]'} href={'/'}>
                        {t('GO_BACK')}
                    </NavLink>
                </div>

                <DelayedTransition pending={forgotPasswordQuery.isPending}/>
            </div>
        </div>
    </div>;
};

export default ForgotPassword;