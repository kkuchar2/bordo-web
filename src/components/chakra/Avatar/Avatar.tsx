import React from 'react';

import {Avatar as ChakraAvatar, AvatarProps} from '@chakra-ui/react';
import {getAvatarFromProfile} from 'util/util';

import {UserProfile} from '../../../queries/account/types';

export const Avatar = (props: AvatarProps) => {
    return <ChakraAvatar {...props} {...props.src ? { bg: 'none' } : null}/>;
};

interface ProfileAvatarProps extends AvatarProps {
    profile: UserProfile
}

export const ProfileAvatar = (props: ProfileAvatarProps & AvatarProps) => {

    const { profile, ...rest } = props;

    const src = getAvatarFromProfile(profile);

    return <ChakraAvatar {...rest} src={src} {...src ? { bg: 'none' } : null}/>;
};