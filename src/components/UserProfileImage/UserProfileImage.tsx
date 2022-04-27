import React from "react";

import { getUserState} from "appRedux/reducers/api/user/userSlice";
import {User} from "appRedux/reducers/api/user/userSlice.types";
import {RootState} from "appRedux/store";
import {useSelector} from "react-redux";

import {
    PropertyValueSection,
    StyledEditableProfilePictureProperty,
    StyledPropertyValues
} from "./style";

const UserProfileImage = () => {

    const user = useSelector<RootState, User>(getUserState);

    return <StyledEditableProfilePictureProperty>
        <StyledPropertyValues>
            <PropertyValueSection>

            </PropertyValueSection>
        </StyledPropertyValues>
    </StyledEditableProfilePictureProperty>;
};

export default UserProfileImage;