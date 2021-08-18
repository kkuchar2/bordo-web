import {selectorAuth} from "appRedux/reducers/api/account";
import DeleteAccountButton from "components/DeleteAccountButton/DeleteAccountButton.jsx";
import EditablePasswordProperty from "components/EditablePasswordProperty/EditablePasswordProperty.jsx";
import EditableTextProperty from "components/EditableTextProperty/EditableTextProperty";
import {animatedWindowProps, animatedWindowProps2} from "components/FormComponents/animation.js";

import React from "react";
import {useSelector} from "react-redux";
import {
    StyledDeleteAccountSection,
    StyledSettingsPropertiesSection,
    StyledSettingsSection,
    StyledSettingsView
} from "./style.js";

const SettingsView = (props) => {

    const authState = useSelector(selectorAuth);

    return <StyledSettingsView {...animatedWindowProps}>

        <StyledSettingsSection {...animatedWindowProps2}>
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