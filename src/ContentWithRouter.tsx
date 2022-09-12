import React, {useCallback, useEffect, useMemo} from 'react';

import {Box, ChakraProvider, Flex} from '@chakra-ui/react';
import Dialogs from 'components/DialogSystem/Dialogs';
import MainMenu from 'components/MainMenu/MainMenu';
import {mainMenuItems} from 'components/MainMenu/mainMenuItems';
import {showFriendRequestReceived} from 'components/Toast/readyToastNotifications';
import {getUser} from 'queries/account';
import {Toaster} from 'react-hot-toast';
import {useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {openView} from 'state/reducers/application/appSlice';
import {RootState, useAppDispatch} from 'state/store';

import {queryClient} from './App';
import Content from './Content';
import {assignNotificationChannel} from './queries/notifications';
import theme from './theme';

const ContentWithRouter = () => {

    const currentViewId = useSelector((state: RootState) => state.app.currentView ?? 'Home');

    const navigate = useNavigate();

    const location = useLocation();

    const dispatch = useAppDispatch();

    const socketId = useSelector((state: RootState) => state.pusher.socketId);

    const { isLoading, isSuccess, data: user } = getUser();
    const { data: notificationChannelData, mutate: assignNotificationMutate } = assignNotificationChannel({
        friendshipRequest: (friendRequest: any) => {
            queryClient.invalidateQueries(['getFriendRequests']);
            showFriendRequestReceived(friendRequest);
        }
    });

    const onViewChangeMenu = useCallback((path, id) => {
        navigate(path);
        dispatch(openView(id));
    }, [currentViewId]);

    const routedContent = useMemo(() => {
        return <Content/>;
    }, []);

    const mainMenu = useMemo(() => {
        if (isLoading) {
            return null;
        }

        if (!user) {
            return null;
        }

        if (location.pathname.startsWith('/resetPassword')) {
            return null;
        }
        return <MainMenu items={mainMenuItems} onViewChange={onViewChangeMenu} currentViewId={currentViewId}/>;
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
        <Flex w={'100%'} minH={'100vh'} flexGrow={1}>
            {mainMenu}
            <Box flexGrow={1}>
                {routedContent}
            </Box>
        </Flex>
        <Dialogs/>
    </ChakraProvider>;
};

export default ContentWithRouter;