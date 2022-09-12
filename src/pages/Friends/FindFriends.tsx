import React, {useCallback} from 'react';

import {Box, Flex} from '@chakra-ui/react';
import {UserSearch} from 'components/Select/UserSearch/UserSearch';
import {useNavigate} from 'react-router-dom';

import WithAuth from '../../hoc/WithAuth';
import {UserSearchOption} from '../Chats/ChatWindow';

const FindFriends = () => {
    const navigate = useNavigate();

    const onPersonSelected = useCallback((option: UserSearchOption) => {
        console.log('Selected person: ', option);
        navigate(`/user/${option.value.username}`);
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
