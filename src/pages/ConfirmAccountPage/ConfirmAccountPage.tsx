'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { showErrorToast, showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { confirmAccount } from '@/queries/account';

type ConfirmAccountPageProps = {
    token: string;
}

const ConfirmAccountPage = (props: ConfirmAccountPageProps) => {

    const { token } = props;

    const router = useRouter();

    const { isLoading, isError, isSuccess, mutate } = confirmAccount();

    useEffect(() => {
        if (!token) {
            showErrorToast('Verification link invalid or expired');
            router.push('/');
            return;
        }
        mutate({
            key: decodeURIComponent(token),
        });
    }, [token]);

    useEffect(() => {
        if (isError) {
            showErrorToast('Verification link invalid or expired');
            router.push('/');
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess) {
            showSuccessToast('Account verified successfully');
            router.push('/');
        }
    }, [isSuccess]);

    return <DelayedTransition pending={isLoading}/>;
};

export default ConfirmAccountPage;