import {selectorAuth} from "appRedux/reducers/api/account";
import AcccountDisplay from "components/AccountDisplay/AccountDisplay.jsx";
import EditablePasswordProperty from "components/EditablePasswordProperty/EditablePasswordProperty.jsx";
import EditableTextProperty from "components/EditableTextProperty/EditableTextProperty";
import DeleteAccountButton from "components/DeleteAccountButton/DeleteAccountButton.jsx";
import {animatedWindowProps, animatedWindowProps2} from "components/FormComponents/animation.js";
import LogoutButton from "components/LogoutButton/LogoutButton.jsx";

import React from "react";
import {useSelector} from "react-redux";
import {
    StyledDeleteAccountSection,
    StyledLogoutSection,
    StyledSettingsPropertiesSection,
    StyledSettingsSection,
    StyledSettingsView
} from "./style.js";

const SettingsView = (props) => {

    const authState = useSelector(selectorAuth);

    return <StyledSettingsView {...animatedWindowProps}>

        <StyledSettingsSection {...animatedWindowProps2}>
            <AcccountDisplay showLogoutButton={false}/>
            <StyledLogoutSection>
                <LogoutButton/>
            </StyledLogoutSection>
            <StyledSettingsPropertiesSection >
                <EditableTextProperty name={'Email'} value={authState.user.email}/>
                <EditablePasswordProperty name={'Password'} value={"● ● ● ● ● ●"} editText={'Change'}/>
                <StyledDeleteAccountSection>
                    <DeleteAccountButton/>
                </StyledDeleteAccountSection>
            </StyledSettingsPropertiesSection>
        </StyledSettingsSection>

    </StyledSettingsView>;
};

export default SettingsView;