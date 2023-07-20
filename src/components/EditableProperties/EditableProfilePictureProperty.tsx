import { Avatar, Circle, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import { showChangeAvatarDialog } from '@/components/DialogSystem/readyDialogs';
import { getUser } from '@/queries/account';
import { getAvatar } from '@/util/util';

export interface ProfilePictureProps {
    username: string;
}

const EditableProfilePictureProperty = (props: ProfilePictureProps) => {

    const { username } = props;

    const { t } = useTranslation();

    const { data: user } = getUser();

    const avatar = getAvatar(user);

    return <Circle onClick={showChangeAvatarDialog} position={'relative'} _hover={{ cursor: 'pointer' }}>
        <Avatar src={avatar}
            name={username}
            borderRadius={'100%'}
            width={'150px'}
            height={'150px'}
            objectFit={'cover'}
            {...avatar ? { bg: 'none' } : null} />
        <Circle position={'absolute'}
            top={0}
            left={0}
            size={'100%'}
            bg={'#2e2e2e'}
            opacity={0}
            _hover={{
                opacity: 1,
                bg: 'rgba(46,46,46,0.8)'
            }}>
            <Text fontWeight={'semibold'}>{t('CHANGE_AVATAR')}</Text>
        </Circle>
    </Circle>;
};

export default EditableProfilePictureProperty;