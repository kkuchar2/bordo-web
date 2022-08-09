import React, {useCallback, useEffect, useMemo} from 'react';

import {Image, Text} from '@chakra-ui/react';
import {showChangeAvatarDialog} from 'components/DialogSystem/readyDialogs';
import {showSuccessAvatar} from 'components/Toast/readyToastNotifications';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from 'state/store';

import {isSuccess} from '../../../api/api_util';

import {
    PropertyValueSection,
    StyledAvatarWithOverlay,
    StyledEditableProfilePictureProperty,
    StyledOverlay,
    StyledPropertyValues
} from './style';

export interface ProfilePictureProps {
    useImageUpload?: boolean;
}

const EditableProfilePictureProperty = (props: ProfilePictureProps) => {

    const { useImageUpload } = props;

    const changeAvatarState = useSelector((state: RootState) => state.account.requests.changeAvatar);
    const changeAnimatedAvatarState = useSelector((state: RootState) => state.account.requests.changeAnimatedAvatar);

    const avatar = useSelector((state: RootState) => {
        const profile = state.account.user.profile;

        if (profile.use_animated_avatar) {
            return profile.animated_avatar;
        }
        return profile.avatar;
    });

    const { t } = useTranslation();

    useEffect(() => {
        if (isSuccess(changeAvatarState)) {
            showSuccessAvatar('Avatar changed successfully', avatar);
        }
    }, [changeAvatarState, avatar]);

    useEffect(() => {
        if (isSuccess(changeAnimatedAvatarState)) {
            showSuccessAvatar('Avatar changed successfully', avatar);
        }
    }, [changeAnimatedAvatarState, avatar]);

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
        return <StyledOverlay>
            <Text>{t('CHANGE_AVATAR')}</Text>
        </StyledOverlay>;
    }, [useImageUpload]);

    return <StyledEditableProfilePictureProperty enableUpload={useImageUpload}>
        <StyledPropertyValues>
            <PropertyValueSection>
                <StyledAvatarWithOverlay onClick={onChangeImageClick} useImageUpload={useImageUpload}>
                    <Image src={avatar}
                           borderRadius={'100%'}
                           width={'200px'}
                           height={'200px'}
                           objectFit={'cover'}/>
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