import { useCallback, useEffect, useState } from 'react';

import { getAuth, sendEmailVerification, User } from '@firebase/auth';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { showSuccessToast } from '@/components/Toast/readyToastNotifications';
import { initializeFirebase } from '@/firebase/firebaseApp';
import { resendRegistrationEmail } from '@/queries/account';

const COOLDOWN = 60 * 1000;

const getRemainingSeconds = () => {
    const lastSentTimeStr = localStorage.getItem('last_time_email_verify');

    if (lastSentTimeStr == null) {
        return 0;
    }

    const lastSentTime = lastSentTimeStr ? parseInt(lastSentTimeStr) : null;

    if (lastSentTime) {
        return Math.ceil((COOLDOWN - (Date.now() - lastSentTime)) / 1000);
    }
    else {
        return 0;
    }
};

// TODO: Restore normal verify dialog without Firebase
// TODO: Handle situation, when other unverified user is logging in (then old timer should be cleared)
export const VerifyAccountDialog = () => {

    const { t } = useTranslation();

    const app = initializeFirebase();
    const auth = getAuth(app);

    const user = auth.currentUser;

    const query = resendRegistrationEmail();

    const [remainingSeconds, setRemainingSeconds] = useState(-1);
    const [firebaseSendPending, setFirebaseSendPending] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            const remainingSeconds = getRemainingSeconds();

            if (remainingSeconds >= 0) {
                setRemainingSeconds(remainingSeconds);
            }
        }, 1000);
        return () => { clearInterval(timer); };
    }, []);

    useEffect(() => {
        const remainingSeconds = getRemainingSeconds();
        if (remainingSeconds >= 0) {
            setRemainingSeconds(remainingSeconds);
        }
        sendVerification(user, remainingSeconds);
    }, [user]);

    const sendVerification = useCallback(async (user: User | null, remainingSeconds: number) => {
        if (!user || remainingSeconds > 0) {
            return;
        }

        localStorage.setItem('last_time_email_verify', Date.now().toString());
        setFirebaseSendPending(true);
        await sendEmailVerification(user);
        showSuccessToast(`✉️ ${t('VERIFICATION_EMAIL_SENT')}`);
        setFirebaseSendPending(false);
    }, [user]);

    const onResendEmailClick = useCallback(async () => {
        await sendVerification(user, remainingSeconds);
    }, [user, remainingSeconds]);

    const isCoolDown = remainingSeconds > 0;

    return <div className={'flex w-full flex-col items-center justify-end gap-[20px] p-[10px]'}>
        <button
            className={'rounded-full bg-white/5 px-5 py-2 hover:bg-white/10 disabled:cursor-not-allowed ' +
                'disabled:bg-black/20 disabled:text-white/20'}
            disabled={query.isLoading || isCoolDown || firebaseSendPending}
            onClick={onResendEmailClick}>
            {`${t('RESEND_VERIFICATION_EMAIL')} ${isCoolDown ? `(${remainingSeconds})` : ''}`}
        </button>
        <DelayedTransition pending={query.isLoading}/>
    </div>;
};