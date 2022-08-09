import React, {useCallback, useMemo} from 'react';

import {Box, Button, Center, VStack} from '@chakra-ui/react';
import {KeyIcon} from '@heroicons/react/solid';
import {ConnectedAccount} from 'components/ConnectedAccount/ConnectedAccount';
import {
    showChangeEmailDialog,
    showChangePasswordDialog,
    showChangeUsernameDialog,
    showDeleteAccount
} from 'components/DialogSystem/readyDialogs';
import EditableProfilePictureProperty
    from 'components/EditableProperties/EditableProfilePictureProperty/EditableProfilePictureProperty';
import EditableProperty from 'components/EditableProperties/EditableProperty';
import {SettingsSection} from 'components/Settings/SettingsSection';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from 'state/store';

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

        return <SettingsSection title={t('CONNECTED_ACCOUNTS')}>
            <div className={'flex items-center justify-start w-full'}>
                {supportedProviders.map((provider, idx) => <ConnectedAccount key={idx} supportedProvider={provider}
                                                                             connections={connections}/>)}
            </div>
        </SettingsSection>;
    }, [userState, t]);

    return <VStack spacing={'20px'} w={'600px'} justify={'flex-start'} p={5} align={'stretch'}>
        <Box bg={'rgba(0,0,0,0.1)'}>
            <Center padding={3}>
                <EditableProfilePictureProperty
                    useImageUpload={true}
                    useActiveIndicator={false}
                    pictureSize={150}/>
            </Center>
            <VStack spacing={'20px'} padding={3} width={'100%'} align={'stretch'}>
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
            </VStack>
        </Box>

        <VStack align={'stretch'}>
            <SettingsSection title={t('PASSWORD AND AUTHENTICATION')} show={!isOnlySocial}>
                <EditableProperty
                    id={'password'}
                    name={t('CHANGE_PASSWORD')}
                    editText={'CHANGE_PASSWORD'}
                    value={null}
                    canEdit={true}
                    hideTitle={true}
                    passwordRequired={true}
                    icon={{
                        component: KeyIcon,
                        color: 'text-pink-500',
                    }}
                    showDialogFunc={showChangePasswordDialog}
                />
            </SettingsSection>

            {renderSocialAccountConnections}

            <SettingsSection title={t('ACCOUNT_REMOVAL_SECTION_TITLE')}>
                <Button bg={'red.600'} _hover={{
                    bg: 'red.500',
                }} fontSize={'13px'} onClick={onDeleteAccountAction}>
                    {t('DELETE_ACCOUNT')}
                </Button>
            </SettingsSection>

        </VStack>
    </VStack>;
};

export default AccountSettings;