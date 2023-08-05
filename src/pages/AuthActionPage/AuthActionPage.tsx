'use client';

import { useCallback, useEffect } from 'react';

import { applyActionCode, getAuth } from '@firebase/auth';
import { redirect, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { showErrorToast, showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { initializeFirebase } from '@/firebase/firebaseApp';

const AuthActionPage = () => {

    const router = useRouter();

    const searchParams = useSearchParams();

    if (!searchParams) {
        return redirect('/');
    }

    const mode = searchParams.get('mode');

    if (!mode) {
        return redirect('/');
    }

    const ooBCode = searchParams.get('oobCode');

    const app = initializeFirebase();
    const auth = getAuth(app);

    useEffect(() => {
        applyAction(mode).then(() => {});
    }, [mode]);

    const applyAction = useCallback(async (mode?: string) => {
        if (mode === 'verifyEmail' && ooBCode) {
            try {
                await applyActionCode(auth, ooBCode);
                showSuccessToast('Account verified');
            }
            catch (e) {
                showErrorToast('Verification link invalid or expired');
            }
            router.push('/');
        }
    }, [mode]);

    return null;
};

export default AuthActionPage;
