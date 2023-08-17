'use client';

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

    const ooBCode = searchParams.get('oobCode');

    const app = initializeFirebase();
    const auth = getAuth(app);

    if (!mode) {
        return redirect('/');
    }

    if (mode === 'verifyEmail' && ooBCode) {
        applyActionCode(auth, ooBCode)
            .then(() => {
                showSuccessToast('Account verified');
            })
            .catch(() => {
                showErrorToast('Verification link invalid or expired');
            })
            .finally(() => {
                router.push('/');
            });
    }
    else if (mode === 'resetPassword' && ooBCode) {
        return redirect(`/resetPassword/${ooBCode}`);
    }

    return null;
};

export default AuthActionPage;
