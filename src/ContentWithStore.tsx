'use client';

import React, { ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';

import Dialogs from '@/components/DialogSystem/Dialogs';
import SideBar from '@/components/SideBar/SideBar';

type ContentWithStoreProps = {
    children: ReactNode;
}

export const anonymousUsersLocations = [
    '/',
    '/signup',
    '/forgotPassword',
    '/resetPassword',
    '/userAgreement',
    '/userAgreement',
];

export const ContentWithStore = (props: ContentWithStoreProps) => {

    return <div className={'text-white'}>
        <Toaster/>
        <div className={'flex h-screen w-full'}>
            <SideBar />
            <div className={'h-full grow overflow-auto'}>
                {props.children}
            </div>
        </div>
        <Dialogs/>
    </div>;
};