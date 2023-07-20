'use client';

import React, { ReactNode, useEffect, useMemo } from 'react';

import { Box, ChakraProvider } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

import Dialogs from '@/components/DialogSystem/Dialogs';
import MainMenu from '@/components/MainMenu/MainMenu';
import { mainMenuItems } from '@/components/MainMenu/mainMenuItems';
import { showFriendRequestReceived } from '@/components/Toast/readyToastNotifications';
import { UserBadge } from '@/components/UserStatusBadge/UserBadge';
import { queryClient } from '@/config';
import Groups from '@/pages/Groups/Groups';
import { getUser } from '@/queries/account';
import { assignNotificationChannel } from '@/queries/notifications';
import { currentView } from '@/state/reducers/application/appSlice';
import { RootState } from '@/state/store';
import theme from '@/theme';

type ContentWithChakraProps = {
    children: ReactNode;
}

export const ContentWithChakra = (props: ContentWithChakraProps) => {

    const currentViewId = useSelector(currentView);

    const socketId = useSelector((state: RootState) => state.pusher.socketId);

    const { isLoading, data: user } = getUser();

    const { mutate: assignNotificationMutate } = assignNotificationChannel({
        friendshipRequest: (friendRequest: any) => {
            queryClient.invalidateQueries(['getFriendRequests']);
            showFriendRequestReceived(friendRequest);
        }
    });

    const sideBar = useMemo(() => {
        if (isLoading || !user || location.pathname.startsWith('/resetPassword') || location.pathname.startsWith('/verify-email')) {
            return null;
        }
        return <div className={'flex w-[330px] flex-col gap-[50px] bg-black/10 p-[20px]'}>
            <UserBadge user={user}/>
            <MainMenu items={mainMenuItems} currentViewId={currentViewId}/>
            <Groups/>
        </div>;
    }, [user, location, currentViewId]);

    useEffect(() => {
        if (!user || !socketId) {
            return;
        }
        assignNotificationMutate({
            socket_id: socketId.toString()
        });
    }, [user, socketId]);

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