import React, {useCallback} from 'react';

import {Flex, List, ListItem, Text} from '@chakra-ui/react';

import {FriendshipRequest} from '../../types/friendship';

import {ReceivedFriendRequest} from './ReceivedFriendRequest';

interface ReceivedFriendshipRequestListProps {
    requests: FriendshipRequest[];
    titleFunc: (count: number) => string;
}

export const ReceivedFriendshipRequestList = (props: ReceivedFriendshipRequestListProps) => {

    const { requests, titleFunc } = props;

    const onAccept = useCallback((request: FriendshipRequest) => {
        console.log('Accepted: ', request);
    }, []);

    const onReject = useCallback((request: FriendshipRequest) => {
        console.log('Rejected: ', request);
    }, []);

    return <Flex direction={'column'} w={'100%'} gap={'30px'} p={'20px'}>
        <Text color={'rgba(255,255,255,0.56)'}
              fontSize={'sm'}
              fontWeight={'bold'}>{titleFunc(requests.length)}</Text>
        <List w={'100%'} maxW={'600px'}>
            {requests.map(request => <ListItem key={request.id}>
                <ReceivedFriendRequest request={request}/>
            </ListItem>)}
        </List>
    </Flex>;
};