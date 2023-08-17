import React, { useCallback } from 'react';

import { getAuth, signOut } from '@firebase/auth';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar';
import {  queryClient } from '@/config';
import { initializeFirebase } from '@/firebase/firebaseApp';

export const UserBadge = () => {

    const { t } = useTranslation();

    const app = initializeFirebase();
    const auth = getAuth(app);
    const router = useRouter();

    const firebaseUser = auth.currentUser;

    if (!firebaseUser) {
        return null;
    }

    const onLogoutButtonClick = useCallback(async () => {
        await signOut(auth);
        localStorage.removeItem('firebase_token');
        queryClient.setQueryData(['user'], null);
        router.push('/');
    }, []);

    return <div className={'flex w-full gap-4 rounded-md p-4'}>
        <ProfileAvatar width={50} height={50} fill={false}/>
        <div className={'flex flex-col items-stretch gap-1'}>
            <div className={'font-semibold text-white'}>
                {firebaseUser.displayName}
            </div>
            <div className={'text-[12px] text-white/80'}>
                {firebaseUser.email}
            </div>
            <div className={'flex justify-end pt-2'}>
                <button
                    title={'Logout'}
                    onClick={onLogoutButtonClick}
                    className={'rounded-full bg-white/5 px-4 py-2 text-[12px] font-semibold hover:bg-white/10'}>
                    {t('LOGOUT')}
                </button>
            </div>
        </div>
    </div>;
};
