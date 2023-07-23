import React, { useCallback } from 'react';

import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { ButtonWithIcon } from '@/components/ButtonWithIcon/ButtonWithIcon';
import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar';
import { logout } from '@/queries/account';
import { UserInfo } from '@/queries/account/types';

type UserBadgeProps = {
    user: UserInfo;
}

export const UserBadge = (props: UserBadgeProps) => {

    const { user } = props;

    const { mutate: performLogout } = logout();

    const { t } = useTranslation();

    if (!user) {
        return null;
    }

    const onLogoutButtonClick = useCallback(() => {
        performLogout({});
    }, []);

    return <div className={'flex w-full gap-4 rounded-md bg-white/5 p-4'}>
        <ProfileAvatar width={50} height={50} fill={false}/>
        <div className={'flex flex-col items-stretch gap-1'}>
            <div className={'font-semibold text-white'}>
                {user.username}
            </div>
            <div className={'text-[12px] text-white/80'}>
                {user.email.email}
            </div>
            <div className={'flex justify-end pt-2'}>
                <ButtonWithIcon
                    title={'Logout'}
                    onClick={onLogoutButtonClick}
                    icon={{
                        component: ArrowLeftIcon,
                        size: 18,
                    }}
                    className={'bg-white/5 p-2 text-[12px] font-semibold hover:bg-white/10'}
                    iconColor={'rgba(255,255,255,0.8)'}
                    iconColorHover={'white'}>
                    {t('LOGOUT')}
                </ButtonWithIcon>
            </div>
        </div>
    </div>;
};
