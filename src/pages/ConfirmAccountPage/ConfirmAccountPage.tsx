'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
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

    return isLoading && <DelayedTransition pending={true}
        position={'absolute'}
        bottom={0}
        left={0}
        p={0} w={'100%'}/>;
};

export default ConfirmAccountPage;