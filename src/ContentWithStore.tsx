'use client';

import React, { ReactNode, useMemo } from 'react';

import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Dialogs from '@/components/DialogSystem/Dialogs';
import MainMenu from '@/components/MainMenu/MainMenu';
import { mainMenuItems } from '@/components/MainMenu/mainMenuItems';
import { UserBadge } from '@/components/UserStatusBadge/UserBadge';
import { getUser } from '@/queries/account';
import { currentView } from '@/state/reducers/application/appSlice';

type ContentWithStoreProps = {
    children: ReactNode;
}

export const ContentWithStore = (props: ContentWithStoreProps) => {

    const currentViewId = useSelector(currentView);

    const { isLoading, data: user } = getUser();

    const sideBar = useMemo(() => {
        if (isLoading || !user || location.pathname.startsWith('/resetPassword') || location.pathname.startsWith('/verify-email')) {
            return null;
        }
        return <div className={'flex w-[330px] flex-col gap-[50px] bg-black/10 p-[20px]'}>
            <UserBadge user={user}/>
            <MainMenu items={mainMenuItems} currentViewId={currentViewId}/>
        </div>;
    }, [user, location, currentViewId]);

    return <div className={'text-white'}>
        <Toaster />
        <div className={'flex h-screen w-full'}>
            {sideBar}
            <div className={'h-full grow overflow-auto'}>
                {props.children}
            </div>
        </div>
        <Dialogs/>
    </div>;
};