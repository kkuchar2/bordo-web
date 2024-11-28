import React, { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar';
import { logout } from '@/queries/account';
import { NewUserInfo } from '@/queries/account/types';

type UserBadgeProps = {
    user: NewUserInfo;
}

export const UserBadge = (props: UserBadgeProps) => {

    const { user } = props;

    const logoutQuery = logout();

    const { t } = useTranslation();

    const onLogoutButtonClick = useCallback(async () => {
        logoutQuery.mutate();
    }, []);

    return <div className={'flex w-full gap-4 rounded-md p-4'}>
        <ProfileAvatar width={50} height={50} fill={false}/>
        <div className={'flex flex-col items-stretch gap-1'}>
            <div className={'font-semibold text-white'}>
                {user.username}
            </div>
            <div className={'text-[12px] text-white/80'}>
                {user.email}
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
