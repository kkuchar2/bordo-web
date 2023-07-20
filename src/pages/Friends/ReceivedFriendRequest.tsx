import React, { useCallback } from 'react';

import { Flex, Text } from '@chakra-ui/react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

import { acceptFriendRequest, getProfile, rejectFriendRequest } from '../../queries/people';
import { FriendshipRequest } from '../../types/friendship';

import { ProfileAvatar } from '@/components/chakra/Avatar/Avatar';
import { ButtonWithIcon } from '@/components/chakra/ButtonWithIcon/ButtonWithIcon';
import { NavLink } from '@/components/chakra/NavLink/NavLink';

interface ReceivedFriendRequestsProps {
    showUsername?: boolean;
    showAvatar?: boolean;
    message?: string;
    request: FriendshipRequest;
}

export const ReceivedFriendRequest = (props: ReceivedFriendRequestsProps) => {

    const { request, showUsername = true, showAvatar = true, message = 'Incoming friend request' } = props;

    const { data: profile } = getProfile(request.from_user)({ staleTime: 1 });

    const { mutate: rejectRequestMutate } = rejectFriendRequest();
    const { mutate: acceptRequestMutate } = acceptFriendRequest();

    const onAcceptClick = useCallback(() => {
        acceptRequestMutate({
            id: request.id,
        });
    }, [request]);

    const onRejectClick = useCallback(() => {
        rejectRequestMutate({
            id: request.id,
        });
    }, [request]);

    if (!profile) {
        return null;
    }

    return <Flex gap={3} align={'center'}>
        {showAvatar && <ProfileAvatar profile={profile} width={'50px'} height={'50px'}/>}
        <Flex direction={'column'} justify={'center'} gap={1}>
            {showUsername && <NavLink color={'#ffffff'} fontWeight={'semibold'}
                href={`/user/${request.from_user}`}>{request.from_user}</NavLink>}
            <Text fontSize={'12px'} fontWeight={'medium'}
                color={'rgba(255,255,255,0.52)'}>{message}</Text>
        </Flex>
        <Flex flexGrow={1} gap={'20px'} justify={'flex-end'}>

            <ButtonWithIcon title={'Accept'}
                iconSize={20}
                onClick={onAcceptClick}
                iconColor={'rgba(255,255,255,0.48)'}
                iconColorHover={'white'}
                IconComponent={CheckIcon}>
                {'Accept'}
            </ButtonWithIcon>

            <ButtonWithIcon
                title={'Decline'}
                iconSize={20}
                iconColor={'rgba(255,255,255,0.48)'}
                onClick={onRejectClick}
                iconColorHover={'white'}
                IconComponent={XMarkIcon}>
                {'Decline'}
            </ButtonWithIcon>
        </Flex>
    </Flex>;
};
