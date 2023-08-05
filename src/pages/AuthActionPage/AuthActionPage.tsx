'use client';

import { useEffect } from 'react';

import { applyActionCode, getAuth } from '@firebase/auth';
import { redirect, useSearchParams } from 'next/navigation';

import { initializeFirebase } from '@/firebase/firebaseApp';

const AuthActionPage = () => {

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
        if (mode === 'verifyEmail' && ooBCode) {
            applyActionCode(auth, ooBCode)
                .then(() => {
                    console.log('Email verified');
                    redirect('/');
                })
                .catch((error) => {
                    console.log('Error verifying email:', error);
                });
        }
    }, [mode]);

    return null;
};

export default AuthActionPage;
