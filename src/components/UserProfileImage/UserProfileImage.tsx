import React, {useCallback} from "react";

import {useMediaQuery} from "@material-ui/core";
import {selectorAuth} from "appRedux/reducers/api/account";
import {useSelector} from "react-redux";

import {
    PropertyValueSection,
    StyledEditableProfilePictureProperty,
    StyledProfilePicture,
    StyledPropertyValues
} from "./style";

export interface ProfilePictureProps {

}

const UserProfileImage = (props: ProfilePictureProps) => {

    const authState = useSelector(selectorAuth);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const renderProfilePicture = useCallback(() => {
        const path = authState.path;
        const correctContext = path === 'changeProfileImage';
        const isRequestPending = authState.requestState.pending;

        return <StyledProfilePicture
            url={isRequestPending && correctContext ? "" : authState.user.avatar}
            size={30}>
        </StyledProfilePicture>;
    }, [authState, isMobile]);

    return <StyledEditableProfilePictureProperty>
        <StyledPropertyValues>
            <PropertyValueSection>
                {renderProfilePicture()}
            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableProfilePictureProperty>;
};

export default UserProfileImage;