import React, { useCallback } from 'react';

import { getAuth, signOut } from '@firebase/auth';
import { useTranslation } from 'react-i18next';

import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar';
import { isFirebaseAuthEnabled, queryClient } from '@/config';
import { initializeFirebase } from '@/firebase/firebaseApp';
import { logout } from '@/queries/account';
import { UserInfo } from '@/queries/account/types';

type UserBadgeProps = {
    user: UserInfo;
}

export const UserBadge = (props: UserBadgeProps) => {

    const { user } = props;

    const { mutate: performLogout } = logout();

    const { t } = useTranslation();

    const firebaseAuthEnabled = isFirebaseAuthEnabled();

    const app = initializeFirebase();
    const auth = getAuth(app);

    if (!user) {
        return null;
    }

    const onLogoutButtonClick = useCallback(async () => {
        if (firebaseAuthEnabled) {
            await signOut(auth);
            localStorage.removeItem('firebase_token');
            queryClient.setQueryData(['user'], null);
        }
        else {
            performLogout({});
        }
    }, []);

    return <div className={'flex w-full gap-4 rounded-md p-4'}>
        <ProfileAvatar width={50} height={50} fill={false}/>
        <div className={'flex flex-col items-stretch gap-1'}>
            <div className={'font-semibold text-white'}>
                {user.username}
            </div>
            <div className={'text-[12px] text-white/80'}>
                {user.email.email}
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
