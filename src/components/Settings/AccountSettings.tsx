import React from "react";

import {getUserAvatar, getUserState} from "appRedux/reducers/api/user/userSlice";
import AccountUnverified from "components/AccountUnverified/AccountUnverified";
import ChangePasswordButton from "components/ChangePasswordButton/ChangePasswordButton";
import DeleteAccountButton from "components/DeleteAccountButton/DeleteAccountButton";
import {showChangeEmailDialog, showChangeUsernameDialog} from "components/Dialogs/readyDialogs";
import DisableAccountButton from "components/DisableAccountButton/DisableAccountButton";
import EditableMailProperty from "components/EditableDialogProperties/EditableMailProperty/EditableMailProperty";
import {StyledAvatar} from "components/EditableProperties/EditableProfilePictureProperty/style";
import {Text} from "kuchkr-react-component-library";
import {useSelector} from "react-redux";

import {
    sectionTextTheme,
    StyledDeleteDisableAccountButtonsSection,
    StyledDeleteAccountSection,
    StyledSettingsPropertiesSection,
    StyledSettingsSection,
    StyledSettingsView,
    accountDisableMessageTextTheme,
    StyledAuthenticationSection,
    StyledAccountSummary,
    StyledAccountSummaryBottom,
    StyledAccountSummaryTop,
    StyledAccountSummaryFields,
    StyledUsername
} from "./style";

const AccountSettings = () => {

    const userState = useSelector(getUserState);
    const avatar = useSelector(getUserAvatar);

    return <StyledSettingsView>
        <StyledSettingsSection>
            <AccountUnverified show={!userState.email.verified}/>
            <StyledAccountSummary>
                <StyledAccountSummaryTop>

                </StyledAccountSummaryTop>

                <StyledAccountSummaryBottom>
                    <StyledAvatar
                        src={avatar}
                        style={{
                            objectFit: "cover",
                            border: "5px solid #222222",
                            position: "absolute",
                            top: -20,
                            left: 20
                        }}
                        email={userState.email.email}
                        size={"90px"}
                        round={true}/>
                    <StyledUsername>{userState.username}</StyledUsername>
                    <StyledAccountSummaryFields>
                        <EditableMailProperty
                            name={'Username'}
                            value={userState.username}
                            obfuscate={false}
                            showDialogFunc={showChangeUsernameDialog}/>
                        <EditableMailProperty
                            name={'Username'}
                            value={userState.email.email}
                            obfuscate={true}
                            showDialogFunc={showChangeEmailDialog}/>
                    </StyledAccountSummaryFields>
                </StyledAccountSummaryBottom>

            </StyledAccountSummary>
            <StyledSettingsPropertiesSection>
                <StyledAuthenticationSection>
                    <Text theme={sectionTextTheme} text={"Password and Authentication"}/>
                    <ChangePasswordButton/>
                </StyledAuthenticationSection>
                <StyledDeleteAccountSection>
                    <Text theme={sectionTextTheme} text={"ACCOUNT REMOVAL"}/>
                    <Text theme={accountDisableMessageTextTheme}
                          text={"Disabling your account means you can recover it at any time after taking this action."}/>
                    <StyledDeleteDisableAccountButtonsSection>
                        <DisableAccountButton/>
                        <DeleteAccountButton/>
                    </StyledDeleteDisableAccountButtonsSection>
                </StyledDeleteAccountSection>
            </StyledSettingsPropertiesSection>
        </StyledSettingsSection>
    </StyledSettingsView>;
};

export default AccountSettings;