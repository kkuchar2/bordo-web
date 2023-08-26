import { useCallback, useEffect, useRef, useState } from 'react';

import { getAuth, signOut } from '@firebase/auth';
import { ArrowLeftCircleIcon, Cog6ToothIcon, FlagIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

import { IconProps } from '@/components/Icons/Icon';
import { HoverMenuItem } from '@/components/MainMenu/HoverMenu/HoverMenuItem';
import { HoverMenuLinkItem } from '@/components/MainMenu/HoverMenu/HoverMenuLinkItem';
import { ProfileAvatar } from '@/components/ProfileAvatar/ProfileAvatar';
import { getFirebaseApp } from '@/firebase/firebaseApp';
import { resetCurrentView } from '@/state/reducers/application/appSlice';
import { useAppDispatch } from '@/state/store';

type BadgeMenuItem = {
    component?: typeof HoverMenuLinkItem;
    title: string;
    href?: string;
    icon?: IconProps;
    onClickProvider?: () => void;
}

const badgeMenuItems: BadgeMenuItem[] = [
    {
        component: HoverMenuLinkItem,
        title: 'ACCOUNT_SETTINGS',
        href: '/account',
        icon: { component: Cog6ToothIcon, color: '#ffffff', size: 20 },
    },
    {
        component: HoverMenuLinkItem,
        href: '/language',
        title: 'LANGUAGE',
        icon: { component: FlagIcon, color: '#ffffff', size: 20 }
    }
];

export const InteractiveUserBadge = () => {

    const { t } = useTranslation();

    const app = getFirebaseApp();
    const auth = getAuth(app);
    const firebaseUser = auth.currentUser;

    const dispatch = useAppDispatch();

    const [showMenu, setShowMenu] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (!ref.current || ref.current.contains(event.target as Node)) {
            return;
        }
        setShowMenu(false);
    }, []);

    const onLogoutButtonClick = useCallback(async () => {
        setShowMenu(false);
        await signOut(auth);
        await dispatch(resetCurrentView());
    }, []);

    const onLinkClick = useCallback(() => {
        setShowMenu(false);
    }, []);

    const onClick = useCallback(() => {
        setShowMenu(!showMenu);
    }, [showMenu]);

    if (!firebaseUser) {
        return null;
    }
    return <div className={'relative'}  ref={ref}>
        <button className={'flex items-center gap-4 p-4 px-5 hover:cursor-pointer hover:bg-white/5'} onClick={onClick}>
            <div className={'font-semibold text-white'}>
                {firebaseUser.displayName}
            </div>

            <ProfileAvatar width={50} height={50} fill={false}/>
        </button>
        {showMenu && <div className={'absolute right-[20px] top-[110%] z-10 w-full animate-navbarMenu overflow-hidden rounded-lg bg-neutral-700 opacity-0 shadow-lg shadow-black/20'}>
            {
                badgeMenuItems.map((item, index) => {
                    const Component = item.component || HoverMenuItem;
                    return <Component key={index}
                        title={t(item.title)}
                        href={item.href || '/'}
                        icon={item.icon}
                        onClick={onLinkClick}/>;
                })
            }
            <HoverMenuItem title={t('LOGOUT')} onClick={onLogoutButtonClick} icon={{ component: ArrowLeftCircleIcon, color: '#ffffff', size: 20 }}/>
        </div>}
    </div>;
};
