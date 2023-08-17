'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { showDialogAfterPasswordResetRequest } from '@/components/DialogSystem/readyDialogs';
import Form from '@/components/Forms/Form/Form';
import { forgotPasswordForm } from '@/components/Forms/formConfig';
import { ForgotPasswordFormArgs } from '@/components/Forms/formConfig.types';
import { firebaseFieldErrorConvert } from '@/components/Forms/util';
import { NavLink } from '@/components/NavLink/NavLink';
import { initializeFirebase } from '@/firebase/firebaseApp';
import WithAuth from '@/hoc/WithAuth';
import { QueryResponseErrorData } from '@/queries/base';

const ForgotPassword = () => {

    const app = initializeFirebase();
    const auth = getAuth(app);

    const { t } = useTranslation();

    const [pending, setPending] = useState(false);
    const [firebaseError, setFirebaseError] = useState<QueryResponseErrorData | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setShow(!user);
        });
    }, []);

    const requestPasswordReset = useCallback(async (formData: ForgotPasswordFormArgs) => {
        const { email } = formData;

        setPending(true);
        try {
            await sendPasswordResetEmail(auth, email);
            showDialogAfterPasswordResetRequest();
        }
        catch (e) {
            const firebaseError = e as FirebaseError;

            if (firebaseError.code === 'auth/user-not-found') {
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'email'));
            }
        }
        finally {
            setPending(false);
        }
    }, []);

    if (!show) {
        return null;
    }

    return <div className={'grid h-full w-full place-items-center'}>
        <div className={'rounded-0 flex w-full flex-col gap-[40px] bg-[#2a2a2a] p-[40px] sm:w-[400px] sm:rounded-md'}>

            <div className={'flex flex-col gap-4'}>
                <div className={'text-center text-2xl tracking-tighter'}>
                    {t('RESET_PASSWORD')}
                </div>

                <div className={'text-center text-sm'}>
                    {t('RESET_PASSWORD_DESCRIPTION')}
                </div>
            </div>

            <div className={'flex flex-col gap-[20px]'}>
                <Form<ForgotPasswordFormArgs>
                    config={forgotPasswordForm}
                    submitButtonTextKey={'RESET_PASSWORD'}
                    submitButtonClassName={'bg-[#77a4df]/80 hover:bg-[#77a4df] text-white py-3 px-4 rounded-sm font-normal disabled:opacity-50 disabled:cursor-not-allowed'}
                    error={firebaseError}
                    disabled={pending}
                    useCancelButton={false}
                    onSubmit={requestPasswordReset}
                />

                <div className={'mt-[20px] flex flex-col items-center justify-center gap-[20px] text-sm'}>
                    <NavLink className={'font-semibold text-[#77a4df] hover:underline'} href={'/'}>
                        {t('GO_BACK')}
                    </NavLink>
                </div>

                <DelayedTransition pending={pending} />
            </div>
        </div>
    </div>;
};

export default WithAuth(ForgotPassword, {
    isPublic: true,
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false,
    name: 'ForgotPassword'
});