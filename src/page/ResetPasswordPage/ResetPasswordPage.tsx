'use client';

import { useCallback, useEffect } from 'react';

import { redirect } from 'next/navigation';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { resetPasswordForm } from '@/components/Forms/formConfig';
import { ResetPasswordFormArgs } from '@/components/Forms/formConfig.types';
import { NavLink } from '@/components/NavLink/NavLink';
import { getUser, resetPassword, verifyResetPasswordToken } from '@/queries/account';

type ResetPasswordPageProps = {
    token: string;
}

const ResetPasswordPage = (props: ResetPasswordPageProps) => {

    const { token } = props;

    const { data: user } = getUser();

    const resetPasswordQuery = resetPassword();

    const verifyTokenQuery = verifyResetPasswordToken();

    const onSubmit = useCallback((formData: ResetPasswordFormArgs) => {
        // Get form data
        const { new_password, new_password_confirm } = formData;

        if (!token) {
            console.error('No key');
            return;
        }

        const decodedToken = decodeURIComponent(token);
        const uid = decodedToken.split(':')[0];
        const tok = decodedToken.split(':')[1];

        resetPasswordQuery.mutate({
            new_password,
            new_password_confirm,
            uid: uid,
            token: tok
        });
    }, [token]);

    useEffect(() => {
        if (!token) {
            console.log('No token');
            return;
        }

        const decodedToken = decodeURIComponent(token);
        const uid = decodedToken.split(':')[0];
        const tok = decodedToken.split(':')[1];

        verifyTokenQuery.mutate({ uid: uid, token: tok });
    }, [token]);

    if (verifyTokenQuery.isPending || verifyTokenQuery.isIdle) {
        return <DelayedTransition pending={true} />;
    }

    if (verifyTokenQuery.isError) {
        console.log('Error: ', verifyTokenQuery.error);
        return null;
    }

    if (verifyTokenQuery.isSuccess) {

        if (resetPasswordQuery.isSuccess) {
            return redirect('/');
        }

        return <div className={'grid size-full place-items-center'}>
            <div className={'flex flex-col gap-[30px] bg-neutral-800 p-[20px]'}>

                <div className={'text-xl font-semibold'}>
                    {'Set up new password'}
                </div>

                <Form<ResetPasswordFormArgs>
                    config={resetPasswordForm}
                    submitButtonTextKey={'SET_NEW_PASSWORD'}
                    validationResponse={resetPasswordQuery.error?.validationResponse}
                    disabled={resetPasswordQuery.isPending}
                    useCancelButton={false}
                    onSubmit={onSubmit}/>

                {!user && <NavLink className={'self-center font-semibold text-[#77a4df]'} href={'/'}>
                    {'Back to login'}
                </NavLink>}

                <DelayedTransition pending={resetPasswordQuery.isPending}/>
            </div>
        </div>;
    }

};

export default ResetPasswordPage;