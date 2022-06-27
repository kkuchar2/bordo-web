import React, {useCallback, useEffect, useMemo} from "react";

import {getUserAvatar, getUserState, useAuthSelector} from "appRedux/reducers/api/auth/accountSlice";
import {ConnectedAccount} from "components/ConnectedAccount/ConnectedAccount";
import {
    showChangeEmailDialog,
    showChangePasswordDialog,
    showChangeUsernameDialog,
    showDeleteAccount
} from "components/DialogSystem/readyDialogs";
import EditableProfilePictureProperty
    from "components/EditableProperties/EditableProfilePictureProperty/EditableProfilePictureProperty";
import EditableProperty from "components/EditableProperties/EditableProperty/EditableProperty";
import {SettingsSection} from "components/Settings/SettingsSection";
import {showSuccessAvatar} from "components/Toast/readyToastNotifications";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {isSuccess} from "../../api/api_util";

import {
    StyledAccountSummaryBottom,
    StyledAccountSummaryFields,
    StyledSettingsPropertiesSection,
    StyledSettingsSection,
    StyledSettingsView
} from "./style";

const AccountSettings = () => {

    const userState = useSelector(getUserState);

    const { t } = useTranslation();

    const isOnlySocial = userState.social.only_social;
    const changeAvatarState = useAuthSelector('changeAvatar');
    const changeAnimatedAvatarState = useAuthSelector('changeAnimatedAvatar');
    const avatar = useSelector(getUserAvatar);

    useEffect(() => {
        if (isSuccess(changeAvatarState)) {
            showSuccessAvatar('Avatar changed successfully', avatar);
        }
    }, [changeAvatarState, avatar]);

    useEffect(() => {
        if (isSuccess(changeAnimatedAvatarState)) {
            showSuccessAvatar('Avatar changed successfully', avatar);
        }
    }, [changeAnimatedAvatarState, avatar]);

    const onDeleteAccountAction = useCallback(() => {
        showDeleteAccount(isOnlySocial);
    }, [userState, isOnlySocial]);

    const renderSocialAccountConnections = useMemo(() => {
        const connections = userState.social.connections;
        const supportedProviders = userState.social.supported_providers;

        if (supportedProviders.length === 0) {
            return null;
        }

        return <SettingsSection title={t("CONNECTED_ACCOUNTS")}>
            <div className={'flex items-center justify-start w-full'}>
                {supportedProviders.map((provider, idx) => <ConnectedAccount key={idx} supportedProvider={provider}
                                                                             connections={connections}/>)}
            </div>
        </SettingsSection>;
    }, [userState, t]);

    return <StyledSettingsView>
        <StyledSettingsSection>
            <div className={'bg-black/10'}>
                <div className={'flex items-center justify-center p-5'}>
                    <EditableProfilePictureProperty
                        useImageUpload={true}
                        useActiveIndicator={false}
                        pictureSize={150}/>
                </div>
                <StyledAccountSummaryBottom>
                    <StyledAccountSummaryFields>
                        <EditableProperty
                            id={'username'}
                            name={'USERNAME'}
                            value={userState.username}
                            canEdit={true}
                            obfuscate={false}
                            passwordRequired={true}
                            showDialogFunc={showChangeUsernameDialog}/>
                        <EditableProperty
                            id={'email'}
                            name={'EMAIL'}
                            value={userState.email.email}
                            canEdit={true}
                            obfuscate={true}
                            passwordRequired={true}
                            showDialogFunc={showChangeEmailDialog}/>
                    </StyledAccountSummaryFields>
                </StyledAccountSummaryBottom>

            </div>

            <StyledSettingsPropertiesSection>

                <SettingsSection title={t("PASSWORD AND AUTHENTICATION")} show={!isOnlySocial}>
                    <button type={'button'} onClick={showChangePasswordDialog} className={'changePasswordButton'}>
                        {t('CHANGE_PASSWORD')}
                    </button>
                </SettingsSection>

                {renderSocialAccountConnections}

                <SettingsSection title={"ACCOUNT REMOVAL"}>
                    <button type={'button'} className={'deleteAccountButton'} onClick={onDeleteAccountAction}>
                        {t('DELETE_ACCOUNT')}
                    </button>
                </SettingsSection>

            </StyledSettingsPropertiesSection>
        </StyledSettingsSection>
    </StyledSettingsView>;
};

export default AccountSettings;