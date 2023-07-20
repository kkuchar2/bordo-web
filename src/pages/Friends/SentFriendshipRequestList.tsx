import React, { useCallback } from 'react';

import { Flex, List, ListItem, Text } from '@chakra-ui/react';

import { FriendshipRequest } from '../../types/friendship';

import { SentFriendRequest } from './SentFriendRequest';

interface SentFriendshipRequestListProps {
    requests: FriendshipRequest[];
    titleFunc: (count: number) => string;
}

export const SentFriendshipRequestList = (props: SentFriendshipRequestListProps) => {

    const { requests, titleFunc } = props;

    const onRemove = useCallback((request: FriendshipRequest) => {
        console.log('Removing sent request: ', request);
    }, []);

    return <Flex direction={'column'} w={'100%'} gap={'30px'} p={'20px'}>
        <Text color={'rgba(255,255,255,0.56)'}
            fontSize={'sm'}
            fontWeight={'bold'}>{titleFunc(requests.length)}</Text>
        <List w={'100%'} maxW={'600px'}>
            {requests.map(request => <ListItem key={request.id}>
                <SentFriendRequest request={request} onRemove={onRemove}/>
            </ListItem>)}
        </List>
    </Flex>;
};