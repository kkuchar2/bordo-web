import React, {useCallback} from 'react';

import {Flex, Text} from '@chakra-ui/react';
import {TrashIcon} from '@heroicons/react/24/solid';
import {ProfileAvatar} from 'components/chakra/Avatar/Avatar';
import {ButtonWithCircleIcon} from 'components/chakra/ButtonWithCircleIcon/ButtonWithCircleIcon';
import {NavLink} from 'components/chakra/NavLink/NavLink';

import {cancelFriendRequest, getProfile} from '../../queries/people';
import {FriendshipRequest} from '../../types/friendship';

interface SentFriendRequestsProps {
    request: FriendshipRequest;
    onRemove: (request: FriendshipRequest) => void;
}

export const SentFriendRequest = (props: SentFriendRequestsProps) => {

    const { request } = props;

    const { data: profile } = getProfile(request.to_user)({ staleTime: 1 });

    const removeRequestMutation = cancelFriendRequest();

    const onRemoveClick = useCallback(() => {
        removeRequestMutation.mutate({
            id: request.id,
        });
    }, [request]);

    if (!profile) {
        return null;
    }

    return <Flex gap={3} align={'center'}>
        <ProfileAvatar profile={profile} width={'50px'} height={'50px'}/>
        <Flex direction={'column'} justify={'center'} gap={1}>
            <NavLink color={'#ffffff'}
                     fontWeight={'semibold'}
                     to={`/user/${request.to_user}`}>{request.to_user}</NavLink>
            <Text fontSize={'12px'} fontWeight={'medium'}
                  color={'rgba(255,255,255,0.52)'}>{'Friend request sent'}</Text>
        </Flex>
        <Flex flexGrow={1} gap={'20px'} justify={'flex-end'}>
            <ButtonWithCircleIcon size={30}
                                  title={'Delete request'}
                                  iconSize={20}
                                  iconColor={'rgba(255,255,255,0.71)'}
                                  circleSize={40}
                                  circleBg={'rgba(0,0,0,0.1)'}
                                  circleBgHover={'rgba(255,0,0,0.2)'}
                                  onClick={onRemoveClick}
                                  iconColorHover={'white'}
                                  IconComponent={TrashIcon}/>
        </Flex>
    </Flex>;
};
