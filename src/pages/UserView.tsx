import React, {useCallback, useEffect, useRef} from 'react';

import {Button, Flex, Menu, MenuButton, MenuItem, MenuList, Text} from '@chakra-ui/react';
import {ChatBubbleLeftIcon, UserIcon, UserPlusIcon} from '@heroicons/react/24/solid';
import {ProfileAvatar} from 'components/chakra/Avatar/Avatar';
import {ButtonWithIcon} from 'components/chakra/ButtonWithIcon/ButtonWithIcon';
import { useTranslation } from 'react-i18next';
import {useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {sendMessageToExistingConversation} from 'state/services/conversationsService';
import {RootState, useAppDispatch} from 'state/store';

import WithAuth from '../hoc/WithAuth';
import {getUser} from '../queries/account';
import {
    cancelFriendRequest,
    getFriends,
    getProfile,
    getReceivedFriendRequests,
    getSentFriendRequests,
    sendFriendRequest,
    unfriend
} from '../queries/people';

import {ReceivedFriendRequest} from './Friends/ReceivedFriendRequest';

const UserView = () => {

    const params = useParams();
    const dispatch = useAppDispatch();

    const messages = useSelector((state: RootState) => state.conversations.conversations[params.username]);
    const socketId = useSelector((state: RootState) => state.pusher.socketId);

    const listRef = useRef<HTMLUListElement>(null);

    const {t} = useTranslation();

    const { data: user } = getUser();
    const { data: profile } = getProfile(params.username)({ staleTime: 1 });
    const { data: receivedFriendRequests } = getReceivedFriendRequests();
    const { data: sentFriendRequests } = getSentFriendRequests();
    const { data: friendsResponse } = getFriends();

    const sendFriendRequestMutation = sendFriendRequest();
    const cancelFriendRequestMutation = cancelFriendRequest();
    const unfriendMutation = unfriend();

    const requestSent = sentFriendRequests?.some((request) => request.to_user === params.username);

    // scroll listRef to bottom when new message is added
    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    const onInputEnterPress = useCallback((currentValue: string) => {
        dispatch(sendMessageToExistingConversation(params.username, currentValue, socketId));
    }, [socketId]);

    const onSendCancelFriendRequest = useCallback(() => {
        if (!requestSent) {
            sendFriendRequestMutation.mutate({
                to_user: params.username
            });
        }
        else {
            const requestId = sentFriendRequests.find((request) => request.to_user === params.username)?.id;
            cancelFriendRequestMutation.mutate({
                id: requestId
            });
        }
    }, [params.username, sentFriendRequests, requestSent]);

    const onUnfriendSelected = useCallback(() => {
        unfriendMutation.mutate({
            to_user: params.username
        });
    }, []);

    if (!profile || !friendsResponse || !receivedFriendRequests || !sentFriendRequests) {
        return null;
    }

    const isFriend = friendsResponse.some((friend) => friend.username === params.username);

    const isCurrentUser = user?.username === params.username;

    const friendRequest = receivedFriendRequests.find((request) => request.from_user === params.username);

    return <Flex direction={'column'} overflow={'none'} align={'flex-start'} height={'100vh'} width={'100%'}>
        <Flex gap={3} direction={'column'} align={'center'} w={'100%'}>
            <Flex direction={'column'} align={'center'} width={'600px'} p={'20px'} gap={'10px'}>
                <ProfileAvatar profile={profile} name={params.username} width={'150px'} height={'150px'}/>
                <Text fontSize={'md'} color={'white'} mt={'20px'} fontWeight={'medium'}>{`@${params.username}`}</Text>
                <Text color={'#939393'} fontSize={'sm'} textAlign={'center'}>{profile.about}</Text>
            </Flex>
            <Flex gap={'10px'}>
                {friendRequest && <ReceivedFriendRequest
                    showUsername={false}
                    showAvatar={false}
                    message={`${friendRequest.from_user} sent you a friend request`}
                    request={friendRequest}/>}

                {!isFriend && !friendRequest && !isCurrentUser && <ButtonWithIcon
                    color={'white'}
                    bg={requestSent ? '#a53c3c' : '#7a62c0'}
                    _hover={{ bg: requestSent ? '#c04444' : '#7a62c0' }}
                    _focus={{ bg: requestSent ? '#c04444' : '#7a62c0' }}
                    _active={{ bg: requestSent ? '#c04444' : '#7a62c0' }}
                    _disabled={{ bg: 'rgba(123,123,123,0.13)' }}
                    display={'flex'}
                    gap={'10px'}
                    onClick={onSendCancelFriendRequest}
                    fontSize={'14px'}
                    IconComponent={requestSent ? null : UserPlusIcon}>
                    {requestSent ? 'Cancel friend request' : 'Send friend request'}</ButtonWithIcon>}

                {isFriend && !friendRequest && <Menu isLazy={true}>
                    <MenuButton as={Button} leftIcon={<UserIcon width={'20px'} height={'20px'}/>}>
                        <Text fontSize={'sm'}>{t('FRIENDS')}</Text>
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={onUnfriendSelected}>
                            {'Unfriend'}
                        </MenuItem>
                    </MenuList>
                </Menu>}

                {isFriend && <ButtonWithIcon
                    color={'white'}
                    bg={'rgb(60,130,236)'}
                    _hover={{ bg: 'rgb(46,114,216)' }}
                    _focus={{ bg: 'rgb(46,114,216)' }}
                    _active={{ bg: 'rgb(46,114,216)' }}
                    _disabled={{
                        bg: 'rgba(46,114,216,0.44)',
                        color: 'rgba(255,255,255,0.44)',
                        cursor: 'not-allowed',
                        _hover: {
                            bg: 'rgba(46,114,216,0.44)'
                        }
                    }}
                    display={'flex'}
                    disabled={false}
                    flexDirection={'row-reverse'}
                    gap={'10px'}
                    padding={'20px'}
                    fontSize={'14px'}
                    borderRadius={'4px'}
                    IconComponent={ChatBubbleLeftIcon}>
                    <Text fontSize={'sm'}>{'Message'}</Text>
                </ButtonWithIcon>}
            </Flex>
        </Flex>
    </Flex>;
};

export default WithAuth(UserView, {
    name: 'Account',
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;