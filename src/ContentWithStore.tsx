import { ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';

import Dialogs from '@/components/DialogSystem/Dialogs';
import NavBar from '@/components/NavBar/NavBar';

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
        <div className={'flex h-screen w-full flex-col'}>
            <NavBar />
            <div className={'flex grow overflow-auto'}>
                {props.children}
            </div>
        </div>
        <Dialogs/>
    </div>;
};