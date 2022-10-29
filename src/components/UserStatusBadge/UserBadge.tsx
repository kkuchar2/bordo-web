import {Avatar, Text, VStack} from "@chakra-ui/react";
import React, {useCallback} from "react";
import {UserInfo} from "../../queries/account/types";
import {logout} from "../../queries/account";
import {useTranslation} from "react-i18next";
import {ArrowLeftIcon} from "@heroicons/react/24/solid";
import { ButtonWithIcon } from "components/chakra/ButtonWithIcon/ButtonWithIcon";

interface UserBadgeProps {
    user: UserInfo;
}

export const UserBadge = (props: UserBadgeProps) => {

    const { user } = props;

    const {mutate: performLogout} = logout();

    const {t} = useTranslation();

    if (!user) {
        return null;
    }

    const { profile } = user;

    const avatar = profile?.avatar;

    const onLogoutButtonClick = useCallback(() => {
        performLogout({})
    }, []);

    return <div className={'w-full flex gap-4 p-4 bg-white/5 rounded-md'}>
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
                <div className={'flex justify-end pt-2'}>
                    <ButtonWithIcon title={'Logout'}
                                    iconSize={18}
                                    className={'bg-white/5 hover:bg-white/10 p-2 p-2 text-[12px] font-semibold'}
                                    iconColor={'rgba(255,255,255,0.8)'}
                                    iconColorHover={'white'}
                                    IconComponent={ArrowLeftIcon}
                                    onClick={onLogoutButtonClick}>
                        {t('LOGOUT')}
                    </ButtonWithIcon>
                </div>
            </VStack>
        </div>
}
