import Image from 'next/image';

import { DefaultPlaceholder } from '@/components/ProfileAvatar/DefaultPlaceholder';
import { LetterPlaceHolder } from '@/components/ProfileAvatar/LetterPlaceholder';
import { getUser } from '@/queries/account';

type ProfileAvatarProps = {
    width?: number;
    height?: number;
    fill?: boolean;
};

export const ProfileAvatar = ({ width = 150, height = 150, fill = false }: ProfileAvatarProps) => {
    const { data: user } = getUser();

    if (!user || !user.email || !user.email.email) {
        return <DefaultPlaceholder width={width} height={height}/>;
    }

    const { profile, email } = user;

    const src = profile?.avatar;

    if (!src) {
        return (
            <LetterPlaceHolder
                letter={email.email[0].toUpperCase()}
                width={width}
                height={height}
            />
        );
    }

    return (
        <Image
            className={'rounded-full'}
            src={src}
            style={{
                width: width,
                height: height,
                objectFit: 'cover'
            }}
            width={width}
            height={height}
            fill={fill}
            alt={'avatar'}
        />
    );
};