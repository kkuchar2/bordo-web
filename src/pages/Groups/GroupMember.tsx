import React from 'react';

import {Badge, Flex, Text} from '@chakra-ui/react';
import {ProfileAvatar} from 'components/chakra/Avatar/Avatar';
import {useNavigate} from 'react-router-dom';

import {getProfile} from '../../queries/people';

interface GroupMemberProps {
    username: string;
    isOwner: boolean;
}

export const GroupMember = (props: GroupMemberProps) => {

    const { username, isOwner } = props;

    const { data: profile } = getProfile(username)({ staleTime: 1 });

    const navigate = useNavigate();

    if (!profile) {
        return null;
    }

    return <Flex align={'center'} p={2} w={'100%'}>
        <Flex align={'center'} direction={'row'} gap={2} >
            <ProfileAvatar profile={profile} name={username} width={'40px'} height={'40px'}/>
            <Text fontSize={'md'} color={'white'} fontWeight={'medium'}
                  _hover={{
                      textDecoration: 'underline',
                      cursor: 'pointer'
                  }}
                  onClick={() => {
                        navigate(`/user/${username}`);
                    }}>
                {`@${username}`}
            </Text>
        </Flex>
        {props.isOwner && <Badge colorScheme={'red'} ml={'auto'}>{'OWNER'}</Badge>}
    </Flex>;
};