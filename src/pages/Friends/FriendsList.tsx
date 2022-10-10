import React from 'react';

import {Box, Center, Grid, GridItem} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import {getFriends} from '../../queries/people';

import {FriendItem} from './FriendItem';

export const FriendsList = () => {

    const { data: friends } = getFriends();

    const {t} = useTranslation();

    if (!friends) {
        return <Center w={'100%'} h={'100%'}>{'Loading...'}</Center>;
    }

    if (!friends || friends.length === 0) {
        return <Center h={'100%'} w={'100%'}>
            <Box>{t('NO_FRIENDS')}</Box>
        </Center>;
    }

    return <Grid templateColumns={'repeat(6, 1fr)'} gap={'30px'} p={'20px'}>
        {friends.map(friend => <GridItem key={friend.username}>
            <FriendItem username={friend.username}/>
        </GridItem>)}
    </Grid>;
};