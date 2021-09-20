import React from "react";

import {selectorAuth} from "appRedux/reducers/api/account";
import DeleteAccountButton from "components/DeleteAccountButton/DeleteAccountButton";
import EditablePasswordProperty from "components/EditablePasswordProperty/EditablePasswordProperty";
import EditableTextProperty from "components/EditableTextProperty/EditableTextProperty";
import {defaultShowUpAnimation} from "components/FormComponents/animation";
import {useSelector} from "react-redux";

import {
    StyledDeleteAccountSection,
    StyledSettingsPropertiesSection,
    StyledSettingsSection,
    StyledSettingsView
} from "./style";

const SettingsView = () => {

    const authState = useSelector(selectorAuth);

    return <StyledSettingsView {...defaultShowUpAnimation}>
        <StyledSettingsSection>
            <StyledSettingsPropertiesSection>
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