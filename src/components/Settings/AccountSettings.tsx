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

import {StyledSettingsPropertiesSection, StyledSettingsView} from "./style";

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
        <div className={'lg:ml-[10px] flex flex-col box-border w-full lg:w-[600px] '}>
            <div className={'bg-black/10'}>
                <div className={'flex items-center justify-center p-5'}>
                    <EditableProfilePictureProperty
                        useImageUpload={true}
                        useActiveIndicator={false}
                        pictureSize={150}/>
                </div>
                <div className={'w-full'}>
                    <div className={'relative p-[20px] box-border w-full'}>
                        <EditableProperty
                            id={'username'}
                            name={t('USERNAME')}
                            value={userState.username}
                            canEdit={true}
                            obfuscate={false}
                            passwordRequired={true}
                            showDialogFunc={showChangeUsernameDialog}/>
                        <EditableProperty
                            id={'email'}
                            name={t('EMAIL')}
                            value={userState.email.email}
                            canEdit={true}
                            obfuscate={true}
                            passwordRequired={true}
                            showDialogFunc={showChangeEmailDialog}/>
                    </div>
                </div>

            </div>

            <StyledSettingsPropertiesSection>

                <SettingsSection title={t("PASSWORD AND AUTHENTICATION")} show={!isOnlySocial}>
                    <button type={'button'} onClick={showChangePasswordDialog} className={'changePasswordButton'}>
                        {t('CHANGE_PASSWORD')}
                    </button>
                </SettingsSection>

                {renderSocialAccountConnections}

                <SettingsSection title={t("ACCOUNT_REMOVAL_SECTION_TITLE")}>
                    <button type={'button'} className={'deleteAccountButton'} onClick={onDeleteAccountAction}>
                        {t('DELETE_ACCOUNT')}
                    </button>
                </SettingsSection>

            </StyledSettingsPropertiesSection>
        </div>
    </StyledSettingsView>;
};

export default AccountSettings;