'use client';

import { useCallback, useEffect, useState } from 'react';

import { confirmPasswordReset, getAuth, onAuthStateChanged } from '@firebase/auth';
import { useRouter } from 'next/navigation';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { resetPasswordForm } from '@/components/Forms/formConfig';
import { ResetPasswordFormArgs } from '@/components/Forms/formConfig.types';
import { initializeFirebase } from '@/firebase/firebaseApp';
import WithAuth from '@/hoc/WithAuth';
import { QueryResponseErrorData } from '@/queries/base';

type ResetPasswordPageProps = {
    oobCode: string;
}

const ResetPasswordPage = (props: ResetPasswordPageProps) => {

    const { oobCode } = props;

    const app = initializeFirebase();
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
        <div className={'flex flex-col gap-[30px] bg-neutral-800 p-[20px]'}>

            <div className={'text-xl font-semibold'}>
                {'Set up new password'}
            </div>

            <Form<ResetPasswordFormArgs>
                config={resetPasswordForm}
                submitButtonTextKey={'SET_NEW_PASSWORD'}
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