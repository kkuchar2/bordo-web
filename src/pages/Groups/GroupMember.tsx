import React, { useCallback } from 'react';

import {Badge, Flex, Text} from '@chakra-ui/react';
import {ProfileAvatar} from 'components/chakra/Avatar/Avatar';
import {useNavigate} from 'react-router-dom';

import {getProfile} from '../../queries/people';
import {removeMemberFromGroup, unsubscribeFromGroup} from "../../queries/groups";

interface GroupMemberProps {
    username: string;
    groupID: string;
    isOwner: boolean;
}

export const GroupMember = (props: GroupMemberProps) => {

    const { username, isOwner, groupID } = props;

    const { data: profile } = getProfile(username)({ staleTime: 1 });

    const navigate = useNavigate();

    const { mutate: removeMemberMutate } = removeMemberFromGroup();

    const onRemoveMemberClicked = useCallback(() => {
        console.log('Remove member clicked', username, groupID);
        removeMemberMutate({
            group_uuid: groupID,
            username: username,
        });
    }, [groupID]);

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
        {/* Remove member button if current user is not the owner */}
        {!isOwner && <Flex  gap={1} align={'end'} justify={'end'} ml={'auto'}>
            <button
                className={'bg-black/10 text-white px-2 py-2 font-semibold hover:bg-black/20 text-white/80 hover:text-white/100 m-auto'}
                onClick={onRemoveMemberClicked}>
                Remove
            </button>
        </Flex>}
    </Flex>;
};
