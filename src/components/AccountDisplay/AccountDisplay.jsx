import {selectorAuth} from "appRedux/reducers/api/account";
import {emailTextTheme, StyledAccountEmailAndPicture, StyledAccountInfo} from "components/AccountDisplay/style.js";
import LogoutButton from "components/LogoutButton/LogoutButton.jsx";
import {Text} from "kuchkr-react-component-library";
import React, {useCallback} from "react";
import {useSelector} from "react-redux";

const AcccountDisplay = props => {

    const {profileImageSize = 50, showLogoutButton = false} = props;

    const authState = useSelector(selectorAuth);

    const renderLogoutButton = useCallback(() => {
        if (!showLogoutButton) {
            return;
        }

        return <LogoutButton/>;
    }, [showLogoutButton]);

    return <StyledAccountInfo>
        <StyledAccountEmailAndPicture>
            <img className={"profilePicture"} src={"images/profile.png"} alt={""} width={profileImageSize} height={profileImageSize}/>
            <div className={"profileDetails"}>
                <Text theme={emailTextTheme} text={authState.user.email}/>
            </div>
        </StyledAccountEmailAndPicture>
        {renderLogoutButton()}
    </StyledAccountInfo>;
};

export default AcccountDisplay;