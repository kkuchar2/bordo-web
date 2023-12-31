'use client';

import { useCallback, useState } from 'react';

import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { showRegistrationCompleteDialog } from '@/components/DialogSystem/readyDialogs';
import Form from '@/components/Forms/Form/Form';
import { registrationForm } from '@/components/Forms/formConfig';
import { RegistrationFormArgs } from '@/components/Forms/formConfig.types';
import { firebaseFieldErrorConvert, firebaseNonFieldErrorConvert } from '@/components/Forms/util';
import { NavLink } from '@/components/NavLink/NavLink';
import { getFirebaseApp } from '@/firebase/firebaseApp';
import WithAuth from '@/hoc/WithAuth';
import { getUser } from '@/queries/account';
import { QueryResponseErrorData } from '@/queries/base';

const SignUpPage = () => {

    const { t } = useTranslation();

    const userQuery = getUser();

    const app = getFirebaseApp();
    const auth = getAuth(app);

    const [firebaseSignUpPending, setFirebaseSignUpPending] = useState(false);
    const [firebaseError, setFirebaseError] = useState<QueryResponseErrorData | null>(null);

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
        await signupFirebaseFirebase(formData);
    }, []);

    return <div className={'flex h-full w-full items-center justify-center bg-[#2a2a2a] md:bg-transparent'}>
        <div
            className={'flex w-full flex-col gap-[30px] rounded-none bg-[#2a2a2a] p-[20px] sm:w-[400px] sm:rounded-md'}>

            <div className={'text-center text-2xl tracking-tighter'}>
                {t('REGISTRATION')}
            </div>

            <Form<RegistrationFormArgs>
                config={registrationForm}
                submitButtonTextKey={'SIGN_UP'}
                submitButtonClassName={'bg-[#77a4df]/80 hover:bg-[#77a4df] text-white py-3 px-4 rounded-sm font-normal disabled:opacity-50 disabled:cursor-not-allowed'}
                error={firebaseError || userQuery.error || {}}
                disabled={firebaseSignUpPending || userQuery.isLoading}
                useCancelButton={false}
                onSubmit={signUp}/>

            <div className={'flex justify-center gap-3 text-sm'}>
                <div className={'text-[#C7C7C7]'}>
                    {t('ALREADY_HAVE_ACCOUNT')}
                </div>
                <NavLink className={'font-semibold text-[#77a4df] hover:underline'} href={'/signin'}>
                    {t('SIGN_IN')}
                </NavLink>
            </div>

            <div className={'flex grow flex-col justify-end'}>
                <div className={'text-center text-sm'}>
                    {t('USER_AGREEMENTS')}
                    <NavLink className={'font-semibold text-[#77a4df] hover:underline'} href={'/userAgreement'}>
                        {t('MORE')}
                    </NavLink>
                </div>
            </div>

            <DelayedTransition pending={userQuery.isLoading || firebaseSignUpPending}/>
        </div>
    </div>;
};

export default WithAuth(SignUpPage, {
    name: 'SignUpPage',
    isPublic: true,
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
});