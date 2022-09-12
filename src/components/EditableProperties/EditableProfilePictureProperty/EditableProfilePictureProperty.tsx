import React, {useCallback, useMemo} from 'react';

import {Avatar, Circle, Text} from '@chakra-ui/react';
import {showChangeAvatarDialog} from 'components/DialogSystem/readyDialogs';
import {useTranslation} from 'react-i18next';
import {getAvatar} from 'util/util';

import {getUser} from '../../../queries/account';

import {
    PropertyValueSection,
    StyledAvatarWithOverlay,
    StyledEditableProfilePictureProperty,
    StyledPropertyValues
} from './style';

export interface ProfilePictureProps {
    useImageUpload?: boolean;
    username: string;
}

const EditableProfilePictureProperty = (props: ProfilePictureProps) => {

    const { useImageUpload, username } = props;

    const { t } = useTranslation();

    const { data: user } = getUser();

    const avatar = getAvatar(user);

    const onChangeImageClick = useCallback(() => {
        if (!useImageUpload) {
            return;
        }

        showChangeAvatarDialog();

    }, [useImageUpload]);

    const renderOverlay = useMemo(() => {
        if (!useImageUpload) {
            return null;
        }
        return <Circle position={'absolute'}
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
        </Circle>;
    }, [useImageUpload]);

    return <StyledEditableProfilePictureProperty enableUpload={useImageUpload}>
        <StyledPropertyValues>
            <PropertyValueSection>
                <StyledAvatarWithOverlay onClick={onChangeImageClick} useImageUpload={useImageUpload}>
                    <Avatar src={avatar}
                            name={username}
                            borderRadius={'100%'}
                            width={'150px'}
                            height={'150px'}
                            objectFit={'cover'}
                            {...avatar ? { bg: 'none' } : null} />
                    {renderOverlay}
                </StyledAvatarWithOverlay>
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableProfilePictureProperty>;
};

EditableProfilePictureProperty.defaultProps = {
    isActive: false,
    useActiveIndicator: true,
    pictureSize: 80,
    useImageUpload: false
};

export default EditableProfilePictureProperty;