'use client';

import React, { ReactNode, useMemo } from 'react';

import { Box, ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Dialogs from '@/components/DialogSystem/Dialogs';
import MainMenu from '@/components/MainMenu/MainMenu';
import { mainMenuItems } from '@/components/MainMenu/mainMenuItems';
import { UserBadge } from '@/components/UserStatusBadge/UserBadge';
import { getUser } from '@/queries/account';
import { currentView } from '@/state/reducers/application/appSlice';
import theme from '@/theme';

type ContentWithChakraProps = {
    children: ReactNode;
}

export const ContentWithChakra = (props: ContentWithChakraProps) => {

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

    return <ChakraProvider theme={theme} resetCSS={true}>
        <Toaster/>
        <div className={'flex h-screen w-full'}>
            {sideBar}
            <Box flexGrow={1} h={'100%'} data-testid={'content'} overflow={'auto'}>
                {props.children}
            </Box>
        </div>
        <Dialogs/>
    </ChakraProvider>;
};