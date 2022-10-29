import {Avatar, AvatarBadge, Center, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import React from "react";
import {UserInfo} from "../../queries/account/types";

interface UserStatusBadgeProps {
    user: UserInfo;
}

export const UserStatusBadge = (props: UserStatusBadgeProps) => {

    const { user } = props;

    if (!user) {
        return null;
    }

    const { profile } = user;

    const avatar = profile?.avatar;

    return <div className={'w-full flex gap-4 p-4 bg-white/5'}>
            <Avatar src={avatar}
                    name={user.username}
                    borderRadius={'10px'}
                    width={'50px'}
                    height={'50px'}
                    objectFit={'cover'}
                    {...avatar ? { bg: 'none' } : null}>
            </Avatar>
            <VStack spacing={1} align={'stretch'} noOfLines={2}>
                <Text color={'white'} fontWeight={'semibold'} fontSize={'md'}>{user.username}</Text>
                <div className={'text-[12px] text-white/80'}>{user.email.email}</div>
            </VStack>
        </div>
}
