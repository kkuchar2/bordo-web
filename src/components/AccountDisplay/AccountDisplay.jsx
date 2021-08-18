import {useMediaQuery} from "@material-ui/core";
import {selectorAuth} from "appRedux/reducers/api/account";
import {
    emailTextTheme,
    logoutButtonTheme,
    StyledAccountEmailAndPicture,
    StyledAccountInfo
} from "components/AccountDisplay/style.js";
import EditableProfilePictureProperty
    from "components/EditableProfilePictureProperty/EditableProfilePictureProperty.jsx";
import LogoutButton from "components/LogoutButton/LogoutButton.jsx";
import {Text} from "kuchkr-react-component-library";
import React, {useCallback} from "react";
import {useSelector} from "react-redux";

const AcccountDisplay = props => {

    const {profileImageSize = 0, showLogoutButton = false} = props;

    const authState = useSelector(selectorAuth);

    const isMobile = useMediaQuery('(max-width: 600px)');

    const renderLogoutButton = useCallback(() => {
        if (!showLogoutButton || isMobile) {
            return;
        }

        return <LogoutButton theme={logoutButtonTheme}/>;
    }, [showLogoutButton, isMobile]);

    const renderUserEmail = useCallback(() => {
        if (isMobile) {
            return;
        }

        return <Text theme={emailTextTheme(isMobile)} text={authState.user.email}/>;
    }, [isMobile]);

    return <StyledAccountInfo>
        <StyledAccountEmailAndPicture>
            <EditableProfilePictureProperty/>
            {renderUserEmail()}
        </StyledAccountEmailAndPicture>
        {renderLogoutButton()}
    </StyledAccountInfo>;
};

export default AcccountDisplay;