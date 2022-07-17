import React, {useCallback, useMemo} from "react";

import {KeyIcon} from "@heroicons/react/solid";
import {ConnectedAccount} from "components/ConnectedAccount/ConnectedAccount";
import {
    showChangeEmailDialog,
    showChangePasswordDialog,
    showChangeUsernameDialog,
    showDeleteAccount
} from "components/DialogSystem/readyDialogs";
import EditableProfilePictureProperty
    from "components/EditableProperties/EditableProfilePictureProperty/EditableProfilePictureProperty";
import EditableProperty from "components/EditableProperties/EditableProperty";
import {SettingsSection} from "components/Settings/SettingsSection";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {RootState} from "state/store";

const AccountSettings = () => {

    const { t } = useTranslation();

    const userState = useSelector((state: RootState) => state.account.user);

    const isOnlySocial = userState.social.only_social;

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

    return <div className={'flex-grow w-full p-0 sm:p-[20px] flex flex-col items-start justify-start box-border'}>
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
                            passwordRequired={true}
                            showDialogFunc={showChangeUsernameDialog}/>
                        <EditableProperty
                            id={'email'}
                            name={t('EMAIL')}
                            value={userState.email.email}
                            canEdit={true}
                            passwordRequired={true}
                            showDialogFunc={showChangeEmailDialog}/>
                    </div>
                </div>

            </div>

            <div className={'w-full flex flex-col flex-start pt-[50px]'}>

                <SettingsSection title={t("PASSWORD AND AUTHENTICATION")} show={!isOnlySocial}>

                    <EditableProperty
                        id={'password'}
                        name={t('CHANGE_PASSWORD')}
                        editText={'CHANGE_PASSWORD'}
                        value={null}
                        canEdit={true}
                        passwordRequired={true}
                        icon={{
                            component: KeyIcon,
                            color: 'text-pink-500',
                        }}
                        showDialogFunc={showChangePasswordDialog}
                    />
                </SettingsSection>

                {renderSocialAccountConnections}

                <SettingsSection title={t("ACCOUNT_REMOVAL_SECTION_TITLE")}>
                    <button type={'button'} className={'deleteAccountButton'} onClick={onDeleteAccountAction}>
                        {t('DELETE_ACCOUNT')}
                    </button>
                </SettingsSection>

            </div>
        </div>
    </div>;
};

export default AccountSettings;