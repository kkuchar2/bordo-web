import React, {useCallback} from 'react';

import {Center, Flex, Text} from '@chakra-ui/react';

import {FriendshipRequest} from '../../types/friendship';

import {ReceivedFriendshipRequestList} from './ReceivedFriendshipRequestList';
import {SentFriendshipRequestList} from './SentFriendshipRequestList';

interface PendingFriendRequestListProps {
    sentRequests: FriendshipRequest[];
    receivedRequests: FriendshipRequest[];
    sentRequestsTitleFunc: (count: number) => string;
    receivedRequestsTitleFunc: (count: number) => string;
}

export const FriendshipRequestsLists = (props: PendingFriendRequestListProps) => {

    const {
        sentRequests,
        receivedRequests,
        sentRequestsTitleFunc,
        receivedRequestsTitleFunc,
    } = props;

    const onAccept = useCallback((request: FriendshipRequest) => {
        console.log('Accepted: ', request);
    }, []);

    const onReject = useCallback((request: FriendshipRequest) => {
        console.log('Rejected: ', request);
    }, []);

    if ((!sentRequests || sentRequests.length === 0) && (!receivedRequests || receivedRequests.length === 0)) {
        return <Center w={'100%'} h={'100%'}>
            <Text>{'You have no requests'}</Text>
        </Center>;
    }

    return <Flex direction={'column'} w={'100%'} h={'100%'} gap={'30px'} p={'20px'}>
        <SentFriendshipRequestList requests={sentRequests} titleFunc={sentRequestsTitleFunc}/>
        <ReceivedFriendshipRequestList requests={receivedRequests} titleFunc={receivedRequestsTitleFunc}/>
    </Flex>;
};