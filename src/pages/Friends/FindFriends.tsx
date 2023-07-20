import React, { useCallback } from 'react';

import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

import WithAuth from '../../hoc/WithAuth';
import { UserSearchOption } from '../Chats/ChatWindow';

import { UserSearch } from '@/components/Select/UserSearch/UserSearch';

const FindFriends = () => {

    const router = useRouter();

    const onPersonSelected = useCallback((option: UserSearchOption) => {
        console.log('Selected person: ', option);
        router.push(`/user/${option.value.username}`);
    }, []);

    return <Flex direction={'column'} w={'100%'} h={'100%'}>
        <UserSearch onSelect={onPersonSelected}/>
        <Box>

        </Box>
    </Flex>;
};

export default WithAuth(FindFriends, {
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;
