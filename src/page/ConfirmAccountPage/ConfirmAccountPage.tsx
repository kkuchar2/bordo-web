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

    const confirmAccountQuery = confirmAccount();

    useEffect(() => {
        if (!token) {
            showErrorToast('Verification link invalid or expired');
            router.push('/');
            return;
        }
        confirmAccountQuery.mutate({
            key: decodeURIComponent(token),
        });
    }, [token]);

    useEffect(() => {
        if (confirmAccountQuery.isError) {
            showErrorToast('Verification link invalid or expired');
            router.push('/');
        }
    }, [confirmAccountQuery.isError]);

    useEffect(() => {
        if (confirmAccountQuery.isSuccess) {
            showSuccessToast('Account verified successfully');
            router.push('/');
        }
    }, [confirmAccountQuery.isSuccess]);

    return <DelayedTransition pending={confirmAccountQuery.isPending}/>;
};

export default ConfirmAccountPage;