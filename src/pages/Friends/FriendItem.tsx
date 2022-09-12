import React from 'react';

import {Flex} from '@chakra-ui/react';
import {ProfileAvatar} from 'components/chakra/Avatar/Avatar';
import {NavLink} from 'components/chakra/NavLink/NavLink';

import {getProfile} from '../../queries/people';

interface FriendItemProps {
    username: string;
}

export const FriendItem = (props: FriendItemProps) => {

    const { username } = props;

    const { data: profile } = getProfile(username)({ staleTime: 1 });

    if (!profile) {
        return null;
    }

    return <Flex gap={3} direction={'column'} align={'center'} p={3} _hover={{
        bg: 'rgba(255,255,255,0.1)',
        cursor: 'pointer',
    }}>
        <ProfileAvatar profile={profile} width={'120px'} height={'120px'}/>
        <Flex direction={'column'} justify={'center'} gap={1}>
            <NavLink color={'#ffffff'}
                     fontWeight={'semibold'}
                     to={`/user/${username}`}>{username}</NavLink>
        </Flex>
    </Flex>;
};
