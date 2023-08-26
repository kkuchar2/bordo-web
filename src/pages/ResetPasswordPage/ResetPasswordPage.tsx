'use client';

import React, { useCallback, useEffect, useState } from 'react';

import { confirmPasswordReset, getAuth, onAuthStateChanged } from '@firebase/auth';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { resetPasswordForm } from '@/components/Forms/formConfig';
import { ResetPasswordFormArgs } from '@/components/Forms/formConfig.types';
import { getFirebaseApp } from '@/firebase/firebaseApp';
import WithAuth from '@/hoc/WithAuth';
import { QueryResponseErrorData } from '@/queries/base';

type ResetPasswordPageProps = {
    oobCode: string;
}

const ResetPasswordPage = (props: ResetPasswordPageProps) => {

    const { oobCode } = props;

    const { t } = useTranslation();

    const app = getFirebaseApp();
    const auth = getAuth(app);

    const [pending, setPending] = useState(false);
    const [firebaseError, setFirebaseError] = useState<QueryResponseErrorData | null>(null);
    const [show, setShow] = useState(false);

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setShow(!user);
        });
    }, []);

    const onSubmit = useCallback(async (formData: ResetPasswordFormArgs) => {
        const { new_password } = formData;

        setPending(true);
        try {
            console.log('Confirming password reset with code:', oobCode);
            await confirmPasswordReset(auth, oobCode, new_password);
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setPending(false);
            router.push('/');
        }
    }, [oobCode]);

    if (!show) {
        return null;
    }

    return <div className={'grid h-full w-full place-items-center'}>
        <div className={'flex w-full flex-col gap-[20px] bg-[#2a2a2a] p-[20px] sm:w-[400px] sm:rounded-md'}>
            <div className={'flex flex-col gap-4'}>
                <div className={'text-center text-2xl tracking-tighter'}>
                    {t('RESET_PASSWORD')}
                </div>

                <div className={'text-center text-sm'}>
                    {t('RESET_PASSWORD_INSTRUCTION_2')}
                </div>
            </div>

            <Form<ResetPasswordFormArgs>
                config={resetPasswordForm}
                submitButtonTextKey={'SET_NEW_PASSWORD'}
                submitButtonClassName={'bg-[#77a4df]/80 hover:bg-[#77a4df] text-white py-3 px-4 rounded-sm font-normal disabled:opacity-50 disabled:cursor-not-allowed'}
                error={firebaseError}
                disabled={pending}
                useCancelButton={false}
                onSubmit={onSubmit}/>

            <DelayedTransition pending={pending} />
        </div>
    </div>;

};

export default WithAuth(ResetPasswordPage, {
    name: 'ResetPasswordPage',
    isPublic: true,
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
});