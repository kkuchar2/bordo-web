import React, {useCallback} from "react";

import {selectorAuth} from "appRedux/reducers/api/account";
import AccountUnverified from "components/AccountUnverified/AccountUnverified";
import DeleteAccountButton from "components/DeleteAccountButton/DeleteAccountButton";
import EditableMailProperty from "components/EditableDialogProperties/EditableMailProperty/EditableMailProperty";
import EditablePasswordProperty from "components/EditableProperties/EditablePasswordProperty/EditablePasswordProperty";
import EditableProfilePictureProperty
    from "components/EditableProperties/EditableProfilePictureProperty/EditableProfilePictureProperty";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {
    StyledDeleteAccountSection,
    StyledSettingsPropertiesSection,
    StyledSettingsSection,
    StyledSettingsView
} from "./style";

const SettingsView = () => {

    const authState = useSelector(selectorAuth);
    const {t} = useTranslation();

    const renderUnverifiedAccount = useCallback(() => {

        const isVerified = authState.user.isVerified;
        console.log(authState.user);
        console.log(`Is verified: ${authState.user}`);

        if (isVerified) {
            return null;
        }

        return <AccountUnverified/>;
    }, [authState]);

    return <StyledSettingsView>
        <StyledSettingsSection>
            {renderUnverifiedAccount()}
            <EditableProfilePictureProperty useImageUpload={true} useActiveIndicator={false} pictureSize={120}/>
            <StyledSettingsPropertiesSection>
                <EditableMailProperty name={'Email'} value={authState.user.email}/>
                <EditablePasswordProperty name={t('PASSWORD')} value={"● ● ● ● ● ●"}/>
                <StyledDeleteAccountSection>
                    <DeleteAccountButton/>
                </StyledDeleteAccountSection>
            </StyledSettingsPropertiesSection>
        </StyledSettingsSection>
    </StyledSettingsView>;
};

export default SettingsView;