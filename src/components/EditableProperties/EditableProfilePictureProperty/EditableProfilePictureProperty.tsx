import React, {useCallback, useMemo} from "react";

import {getUserAvatar, getUserState} from "appRedux/reducers/api/auth/accountSlice";
import {showChangeAvatarDialog} from "components/DialogSystem/readyDialogs";
import {Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {
    changeAvatarTextTheme,
    PropertyValueSection, StyledAvatar,
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

    const userState = useSelector(getUserState);
    const avatar = useSelector(getUserAvatar);

    const { t } = useTranslation();

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
                    <StyledAvatar src={avatar} style={{objectFit: "cover"}} email={userState.email.email} size={pictureSize.toString()} round={true}/>
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