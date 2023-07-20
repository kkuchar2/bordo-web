import React, { useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import { showErrorToast } from '@/components/Toast/readyToastNotifications';
import { confirmAccount } from '@/queries/account';

const ConfirmAccount = () => {

    const params = useParams();
    const router = useRouter();

    const { isIdle, isLoading, error, isError, isSuccess, mutate } = confirmAccount();

    useEffect(() => {
        if (!params) {
            showErrorToast('Verification link invalid or expired');
            router.push('/');
            return;
        }

        console.log('Verifying with token: ', params.token);
        mutate({
            key: params.token
        });
    }, [params]);

    useEffect(() => {
        if (isError) {
            showErrorToast('Verification link invalid or expired');
            router.push('/');
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess) {
            router.push('/');
        }
    }, [isSuccess]);

    return isLoading && <DelayedTransition pending={true}
        position={'absolute'}
        bottom={0}
        left={0}
        p={0} w={'100%'}/>;
};

export default ConfirmAccount;