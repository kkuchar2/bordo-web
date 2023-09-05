'use client';

import { useCallback, useEffect, useState } from 'react';

import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { showVerifyAccountDialog } from '@/components/DialogSystem/readyDialogs';
import Form from '@/components/Forms/Form/Form';
import { loginForm } from '@/components/Forms/formConfig';
import { LoginFormArgs } from '@/components/Forms/formConfig.types';
import { firebaseFieldErrorConvert } from '@/components/Forms/util';
import { GoogleIcon } from '@/components/Icons/GoogleIcon';
import { NavLink } from '@/components/NavLink/NavLink';
import { getFirebaseApp } from '@/firebase/firebaseApp';
import WithAuth from '@/hoc/WithAuth';
import { getUser } from '@/queries/account';
import { QueryResponseErrorData } from '@/queries/base';

const SignInPage = () => {

    const { t } = useTranslation();

    const app = getFirebaseApp();
    const auth = getAuth(app);
    const firebaseUser = auth.currentUser;

    const provider = new GoogleAuthProvider();

    const userQuery = getUser();

    const [firebaseLoginPending, setFirebaseLoginPending] = useState(false);
    const [firebaseError, setFirebaseError] = useState<QueryResponseErrorData | null>(null);

    useEffect(() => {
        if (firebaseUser && !firebaseUser.emailVerified && firebaseLoginPending) {
            showVerifyAccountDialog();
        }
    }, [firebaseUser, firebaseLoginPending]);

    const signInWithGoogleFirebase = useCallback(async () => {
        try {
            await signInWithPopup(auth, provider);
            await userQuery.refetch();
        }
        catch (e) {
            const firebaseError = e as FirebaseError;

            if (firebaseError.code === 'auth/cancelled-popup-request') {
                return;
            }
            else {
                console.error(e);
            }
        }
    }, []);

    const signInEmailPasswordFirebase = useCallback(async (formData: LoginFormArgs) => {
        setFirebaseLoginPending(true);
        try {
            await signInWithEmailAndPassword(auth, formData.username_or_email, formData.password);
            setFirebaseLoginPending(false);
            await userQuery.refetch();
        }
        catch (e) {
            const firebaseError = e as FirebaseError;

            if (firebaseError.code === 'auth/wrong-password') {
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'password'));
            }
            else if (firebaseError.code === 'auth/user-not-found') {
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'username_or_email'));
            }
            else if (firebaseError.code === 'auth/invalid-email') {
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'username_or_email'));
            }
        }
        finally {
            setFirebaseLoginPending(false);
        }
    }, []);

    const attemptLogin = useCallback(async (formData: LoginFormArgs) => {
        await signInEmailPasswordFirebase(formData);
    }, []);

    return <div className={'grid h-full w-full place-items-center'}>
        <div className={'flex w-full flex-col gap-[20px] bg-[#2a2a2a] p-[40px] sm:w-[400px] sm:rounded-md'}>

            <div className={'flex flex-col gap-4'}>
                <div className={'text-center text-2xl tracking-tighter'}>
                    {t('WELCOME')}
                </div>

                <div className={'text-center text-sm'}>
                    {t('LOGIN_MESSAGE')}
                </div>
            </div>

            <Form<LoginFormArgs>
                config={loginForm}
                submitButtonTextKey={'CONTINUE'}
                disabled={firebaseLoginPending || userQuery.isLoading}
                submitButtonClassName={'bg-[#77a4df]/80 hover:bg-[#77a4df] text-white py-3 px-4 rounded-sm font-normal disabled:opacity-50 disabled:cursor-not-allowed'}
                error={firebaseError || userQuery.error || {}}
                afterFieldsContent={() => {
                    return <NavLink className={'text-sm font-semibold text-[#77a4df] hover:underline'} href={'/forgotPassword'}>
                        {t('FORGOT_PASSWORD_QUESTION')}
                    </NavLink>;
                }}
                excludeErrors={['email_not_verified']}
                useCancelButton={false}
                onSubmit={attemptLogin}/>

            <div className={'flex gap-3 text-sm'}>
                <div className={'text-[#C7C7C7]'}>
                    {t('NEED_ACCOUNT')}
                </div>
                <NavLink className={'font-semibold text-[#77a4df] hover:underline'} href={'/signup'}>
                    {t('SIGN_UP')}
                </NavLink>
            </div>

            <div className={'flex w-full items-center gap-3'}>
                <div className={'h-[1px] grow bg-[#C7C7C7]/40'} />
                <div className={'text-xs font-semibold text-white/60'}>{t('OR')}</div>
                <div className={'h-[1px] grow bg-[#C7C7C7]/40'} />
            </div>

            <button
                onClick={signInWithGoogleFirebase}
                className={'flex h-12 w-full items-center justify-center gap-[10px] rounded-md bg-neutral-900 font-medium text-white hover:bg-neutral-950'}>
                <GoogleIcon/>
                {'Continue with Google'}
            </button>

            <DelayedTransition pending={firebaseLoginPending || userQuery.isLoading} />
        </div>
    </div>;
};

export default WithAuth(SignInPage, {
    name: 'SignInPage',
    isPublic: true,
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
});