import React from "react";

import {getUserState} from "appRedux/reducers/api/user/userSlice";
import EditableProfilePictureProperty
    from "components/EditableProperties/EditableProfilePictureProperty/EditableProfilePictureProperty";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {
    StyledSettingsSection,
    StyledSettingsView
} from "./style";

const ProfileSettings = () => {

    const userState = useSelector(getUserState);
    const { t } = useTranslation();

    return <StyledSettingsView>
        <StyledSettingsSection>
            <EditableProfilePictureProperty useImageUpload={true} useActiveIndicator={false} pictureSize={120}/>
        </StyledSettingsSection>
    </StyledSettingsView>;
};

export default ProfileSettings;