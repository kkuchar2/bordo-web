'use client';

import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { getAuth } from '@firebase/auth';
import { usePathname } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

import Dialogs from '@/components/DialogSystem/Dialogs';
import MainMenu from '@/components/MainMenu/MainMenu';
import { mainMenuItems } from '@/components/MainMenu/mainMenuItems';
import { UserBadge } from '@/components/UserStatusBadge/UserBadge';
import { initializeFirebase } from '@/firebase/firebaseApp';

type ContentWithStoreProps = {
    children: ReactNode;
}

const disallowedSidebarLocations = [
    '/',
    '/signup',
    '/forgot-password',
    '/reset-password',
    '/userAgreement',
];

export const ContentWithStore = (props: ContentWithStoreProps) => {
    const app = initializeFirebase();
    const auth = getAuth(app);

    const pathname = usePathname();

    const [showSideBar, setShowSideBar] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setShowSideBar(!!user);
        });
    }, []);

    const sideBar = useMemo(() => {
        if (!showSideBar) return null;

        if (!pathname) return null;

        if (disallowedSidebarLocations.includes(pathname)) return null;

        return <div className={'flex w-[330px] flex-col gap-[50px] bg-black/10 p-[20px]'}>
            <UserBadge />
            <MainMenu items={mainMenuItems} />
        </div>;
    }, [showSideBar, pathname]);

    return <div className={'text-white'}>
        <Toaster/>
        <div className={'flex h-screen w-full'}>
            {sideBar}
            <div className={'h-full grow overflow-auto'}>
                {props.children}
            </div>
        </div>
        <Dialogs/>
    </div>;
};