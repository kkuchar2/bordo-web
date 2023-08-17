import React, { useCallback } from 'react';

import { getAuth, signOut } from '@firebase/auth';
import { useTranslation } from 'react-i18next';

import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar';
import { initializeFirebase } from '@/firebase/firebaseApp';
import { resetCurrentView } from '@/state/reducers/application/appSlice';
import { useAppDispatch } from '@/state/store';

export const UserBadge = () => {

    const { t } = useTranslation();

    const app = initializeFirebase();
    const auth = getAuth(app);
    const firebaseUser = auth.currentUser;

    const dispatch = useAppDispatch();

    const onLogoutButtonClick = useCallback(async () => {
        await signOut(auth);
        await dispatch(resetCurrentView());
    }, []);

    if (!firebaseUser) {
        return null;
    }

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
