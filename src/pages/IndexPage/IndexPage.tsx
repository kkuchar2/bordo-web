'use client';

import React, { useCallback, useEffect, useState } from 'react';

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
import { initializeFirebase } from '@/firebase/firebaseApp';
import WithAuth from '@/hoc/WithAuth';
import { getUser } from '@/queries/account';
import { QueryResponseErrorData } from '@/queries/base';

const IndexPage = () => {

    const { t } = useTranslation();

    const app = initializeFirebase();
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
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            localStorage.setItem('firebase_token', token);
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
            const response = await signInWithEmailAndPassword(auth, formData.username_or_email, formData.password);
            const token = await response.user.getIdToken();
            localStorage.setItem('firebase_token', token);
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
        <div className={'flex w-full flex-col gap-[30px] bg-[#2a2a2a] p-[40px] sm:w-[400px] sm:rounded-md'}>

            <div className={'text-center text-2xl font-bold'}>
                {t('SIGN_IN_TO_YOUR_ACCOUNT')}
            </div>

            <Form<LoginFormArgs>
                config={loginForm}
                submitButtonTextKey={'SIGN_IN'}
                disabled={firebaseLoginPending || userQuery.isLoading}
                submitButtonClassName={'bg-[#77a4df]/80 hover:bg-[#77a4df] text-white py-2 px-4 rounded-md font-semibold disabled:opacity-50 disabled:cursor-not-allowed'}
                error={firebaseError || userQuery.error || {}}
                excludeErrors={['email_not_verified']}
                useCancelButton={false}
                onSubmit={attemptLogin}/>

            <NavLink className={'font-semibold text-[#77a4df]'} href={'/forgotPassword'}>
                {t('FORGOT_PASSWORD_QUESTION')}
            </NavLink>

            <button
                onClick={signInWithGoogleFirebase}
                className={'flex h-12 w-full items-center justify-center gap-[10px] rounded-md bg-neutral-900 font-semibold text-white hover:bg-neutral-950'}>
                <GoogleIcon/>
                {'Sign in with Google'}
            </button>

            <div className={'flex flex-col items-center justify-center gap-[20px]'}>
                <div className={'text-[#C7C7C7]'}>
                    {t('NEED_ACCOUNT')}
                </div>
                <NavLink className={'font-semibold text-[#77a4df]'} href={'/signup'}>
                    {t('CREATE_ACCOUNT')}
                </NavLink>
            </div>

            <DelayedTransition pending={firebaseLoginPending || userQuery.isLoading} />
        </div>
    </div>;
};

export default WithAuth(IndexPage, {
    name: 'IndexPage',
    isPublic: true,
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
});