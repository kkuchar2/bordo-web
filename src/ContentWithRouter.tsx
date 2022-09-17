import React, {useEffect, useMemo} from 'react';

import {Box, ChakraProvider, Flex} from '@chakra-ui/react';
import Dialogs from 'components/DialogSystem/Dialogs';
import MainMenu from 'components/MainMenu/MainMenu';
import {mainMenuItems} from 'components/MainMenu/mainMenuItems';
import {showFriendRequestReceived} from 'components/Toast/readyToastNotifications';
import {getUser} from 'queries/account';
import {Toaster} from 'react-hot-toast';
import {useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';
import {currentView, loadLastView} from 'state/reducers/application/appSlice';
import {RootState, useAppDispatch} from 'state/store';

import {queryClient} from './App';
import Content from './Content';
import {assignNotificationChannel} from './queries/notifications';
import theme from './theme';

const ContentWithRouter = () => {

    const currentViewId = useSelector(currentView);

    const dispatch = useAppDispatch();

    const location = useLocation();

    const socketId = useSelector((state: RootState) => state.pusher.socketId);

    const { isLoading, isSuccess, data: user } = getUser();
    const { data: notificationChannelData, mutate: assignNotificationMutate } = assignNotificationChannel({
        friendshipRequest: (friendRequest: any) => {
            queryClient.invalidateQueries(['getFriendRequests']);
            showFriendRequestReceived(friendRequest);
        }
    });

    useEffect(() => {
        dispatch(loadLastView());
    }, []);

    const routedContent = useMemo(() => {
        return <Content/>;
    }, []);

    const mainMenu = useMemo(() => {
        if (isLoading || !user || location.pathname.startsWith('/resetPassword') || location.pathname.startsWith('/verify-email')) {
            return null;
        }
        return <MainMenu items={mainMenuItems} currentViewId={currentViewId}/>;
    }, [user, location]);

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
        <Flex w={'100%'} h={'100%'}>
            {mainMenu}
            <Box flexGrow={1} h={'100%'} data-testid={'content'} overflow={'auto'}>
                {routedContent}
            </Box>
        </Flex>
        <Dialogs/>
    </ChakraProvider>;
};

export default ContentWithRouter;