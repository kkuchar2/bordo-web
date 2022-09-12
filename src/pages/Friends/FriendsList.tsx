import React from 'react';

import {Box, Center, Grid, GridItem} from '@chakra-ui/react';

import {getFriends} from '../../queries/people';

import {FriendItem} from './FriendItem';

export const FriendsList = () => {

    const { data: friends } = getFriends();

    if (!friends) {
        return <Center w={'100%'} h={'100%'}>{'Loading...'}</Center>;
    }

    console.log('Friends: ', friends);

    if (!friends || friends.length === 0) {
        return <Center h={'100vh'}>
            <Box>{'You have no connections'}</Box>
        </Center>;
    }

    return <Grid templateColumns={'repeat(6, 1fr)'} gap={'30px'} p={'20px'}>
        {friends.map(friend => <GridItem key={friend.username}>
            <FriendItem username={friend.username}/>
        </GridItem>)}
    </Grid>;
};