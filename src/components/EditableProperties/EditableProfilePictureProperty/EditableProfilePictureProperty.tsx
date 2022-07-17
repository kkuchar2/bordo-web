import React, {useCallback, useEffect, useMemo} from "react";

import {showChangeAvatarDialog} from "components/DialogSystem/readyDialogs";
import {showSuccessAvatar} from "components/Toast/readyToastNotifications";
import {Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {RootState} from "state/store";

import {isSuccess} from "../../../api/api_util";

import {
    changeAvatarTextTheme,
    PropertyValueSection,
    StyledAvatar,
    StyledAvatarWithOverlay,
    StyledEditableProfilePictureProperty,
    StyledOverlay,
    StyledPropertyValues
} from "./style";

export interface ProfilePictureProps {
    pictureSize?: number;
    useImageUpload?: boolean;
}

const EditableProfilePictureProperty = (props: ProfilePictureProps) => {

    const { pictureSize, useImageUpload } = props;

    const userState = useSelector((state: RootState) => state.account.user);
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
            <Text theme={changeAvatarTextTheme} text={t("CHANGE_AVATAR")}/>
        </StyledOverlay>;
    }, [useImageUpload]);

    return <StyledEditableProfilePictureProperty enableUpload={useImageUpload}>
        <StyledPropertyValues>
            <PropertyValueSection>
                <StyledAvatarWithOverlay onClick={onChangeImageClick} useImageUpload={useImageUpload}>
                    <StyledAvatar src={avatar} style={{ objectFit: "cover" }} email={userState.email.email}
                                  size={pictureSize.toString()} round={true}/>
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