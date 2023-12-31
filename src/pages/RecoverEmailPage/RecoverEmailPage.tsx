'use client';

import { useCallback, useEffect } from 'react';

import { applyActionCode, getAuth, signOut } from '@firebase/auth';
import { useRouter } from 'next/navigation';

import { showErrorToast, showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { getFirebaseApp } from '@/firebase/firebaseApp';
import WithAuth from '@/hoc/WithAuth';
import { resetCurrentView } from '@/state/reducers/application/appSlice';
import { useAppDispatch } from '@/state/store';

type RecoverEmailPageProps = {
    oobCode: string;
}

const RecoverEmailPage = (props: RecoverEmailPageProps) => {

    const { oobCode } = props;

    const app = getFirebaseApp();
    const auth = getAuth(app);

    const router = useRouter();

    const dispatch = useAppDispatch();

    const recoverEmail = useCallback(async (oobCode: string) => {
        try {
            await applyActionCode(auth, oobCode);
            await signOut(auth);
            await dispatch(resetCurrentView());
            showSuccessToast('Email recovered');
        }
        catch (e) {
            showErrorToast('Verification link invalid or expired');
        }
        finally {
            router.push('/signin');
        }
    }, []);

    useEffect(() => {
        recoverEmail(oobCode).then(() => {});
    }, [oobCode]);

    return null;
};

export default WithAuth(RecoverEmailPage, {
    name: 'RecoverEmailPage',
    isPublic: true,
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: false
});