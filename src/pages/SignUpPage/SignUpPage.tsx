'use client';

import React, { useCallback, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { redirect } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { showRegistrationCompleteDialog } from '@/components/DialogSystem/readyDialogs';
import Form from '@/components/Forms/Form/Form';
import { registrationForm } from '@/components/Forms/formConfig';
import { RegistrationFormArgs } from '@/components/Forms/formConfig.types';
import { firebaseFieldErrorConvert, firebaseNonFieldErrorConvert } from '@/components/Forms/util';
import { NavLink } from '@/components/NavLink/NavLink';
import { isFirebaseAuthEnabled } from '@/config';
import { initializeFirebase } from '@/firebase/firebaseApp';
import { getUser, register } from '@/queries/account';
import { QueryResponseErrorData } from '@/queries/base';

const SignUpPage = () => {

    const { t } = useTranslation();

    const signUpQuery = register();
    const userQuery = getUser();

    const app = initializeFirebase();
    const auth = getAuth(app);

    const [firebaseSignUpPending, setFirebaseSignUpPending] = useState(false);
    const [firebaseError, setFirebaseError] = useState<QueryResponseErrorData | null>(null);

    const firebaseAuthEnabled = isFirebaseAuthEnabled();

    const signupFirebaseFirebase = useCallback(async (formData: RegistrationFormArgs) => {
        setFirebaseSignUpPending(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const createdUser = response.user;

            if (createdUser && !createdUser.emailVerified) {
                try {
                    await updateProfile(createdUser, { displayName: formData.username });
                    await sendEmailVerification(createdUser);
                    showRegistrationCompleteDialog();
                }
                catch (e) {
                    console.log('Error sending email verification or updating profile', e);
                }
            }
            setFirebaseSignUpPending(false);
            await auth.signOut();
        }
        catch (e) {
            const firebaseError = e as FirebaseError;

            if (firebaseError.code === 'auth/email-already-in-use') {
                console.log('email already in use');
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'email'));
            }
            else if (firebaseError.code === 'auth/invalid-email') {
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'email'));
            }
            else if (firebaseError.code === 'auth/weak-password') {
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'password'));
            }
            else {
                setFirebaseError(firebaseNonFieldErrorConvert(firebaseError.code));
            }
        }
        finally {
            setFirebaseSignUpPending(false);
        }
    }, []);

    const signUp = useCallback(async (formData: RegistrationFormArgs) => {
        if (firebaseAuthEnabled) {
            await signupFirebaseFirebase(formData);
            return;
        }
        signUpQuery.mutate(formData);
    }, [firebaseAuthEnabled]);

    if (userQuery.isSuccess && userQuery.data) {
        return redirect('/home');
    }

    console.log('Firebase error', firebaseError);

    return <div className={'grid h-full w-full place-items-center'}>
        <div
            className={'flex w-full flex-col gap-[30px] rounded-none bg-[#2a2a2a] p-[40px] sm:w-[400px] sm:rounded-md'}>
            <h1 className={'text-center text-2xl font-semibold'}>
                {t('REGISTRATION')}
            </h1>

            <Form<RegistrationFormArgs>
                config={registrationForm}
                submitButtonTextKey={'SIGN_UP'}
                error={signUpQuery.error?.data || firebaseError || userQuery.error || {}}
                disabled={signUpQuery.isLoading}
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

            <DelayedTransition pending={signUpQuery.isLoading || firebaseSignUpPending}/>
        </div>
    </div>;
};

export default SignUpPage;