'use client';

import { useCallback, useEffect } from 'react';

import { applyActionCode, getAuth } from '@firebase/auth';
import { useRouter } from 'next/navigation';

import { showErrorToast, showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { initializeFirebase } from '@/firebase/firebaseApp';
import WithAuth from '@/hoc/WithAuth';

type VerifyAccountPageProps = {
    oobCode: string;
}

const VerifyAccountPage = (props: VerifyAccountPageProps) => {

    const { oobCode } = props;

    const app = initializeFirebase();
    const auth = getAuth(app);

    const router = useRouter();

    const confirmAccount = useCallback(async (oobCode: string) => {
        try {
            await applyActionCode(auth, oobCode);
            showSuccessToast('Account verified');
        }
        catch (e) {
            showErrorToast('Verification link invalid or expired');
        }
        finally {
            router.push('/');
        }
    }, []);

    useEffect(() => {
        confirmAccount(oobCode).then(() => {});
    }, [oobCode]);

    return null;
};

export default WithAuth(VerifyAccountPage, {
    name: 'VerifyAccountPage',
    isPublic: true,
    redirectToHomeOnAutologin: true,
    redirectToLoginPageOnUnauthenticated: false
});