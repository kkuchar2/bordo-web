import React, {useCallback, useMemo} from 'react';

import {Box, Button, Center, Flex, VStack} from '@chakra-ui/react';
import {KeyIcon} from '@heroicons/react/24/outline';
import {TextAreaWithEmoji} from 'components/chakra/TextAreaWithEmoji/TextAreaWithEmoji';
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

import WithAuth from '../hoc/WithAuth';
import {changeAbout, getUser} from '../queries/account';

const Account = () => {

    const { t } = useTranslation();

    const { isIdle, isLoading: isAboutSaving, isSuccess: isAboutSavingSuccess, mutate } = changeAbout();

    const { data: user } = getUser();

    const isOnlySocial = user?.social.only_social;

    const onDeleteAccountAction = useCallback(() => {
        showDeleteAccount(isOnlySocial);
    }, [user, isOnlySocial]);

    const renderSocialAccountConnections = useMemo(() => {
        const connections = user.social.connections;
        const supportedProviders = user.social.supported_providers;

        if (supportedProviders.length === 0) {
            return null;
        }

        return <SettingsSection title={t('CONNECTED_TO_GOOGLE')}>
            <Flex align={'center'} justify={'flex-start'} w={'100%'}>
                {supportedProviders.map((provider, idx) => {
                    return <ConnectedAccount key={idx} supportedProvider={provider}
                                             connections={connections}/>;
                })}
            </Flex>
        </SettingsSection>;
    }, [user, t]);

    const onAboutSave = useCallback((value: string) => {
        mutate({ about: value });
    }, []);

    return <VStack spacing={'30px'} w={'600px'} justify={'flex-start'} p={5} align={'stretch'}>
        <Box bg={'rgba(0,0,0,0.1)'} p={'15px'}>
            <Center>
                <EditableProfilePictureProperty
                    username={user.username}
                    useImageUpload={true}
                    useActiveIndicator={false}
                    pictureSize={150}/>
            </Center>
            <VStack spacing={'30px'} padding={3} width={'100%'} align={'stretch'}>
                <EditableProperty
                    id={'username'}
                    name={t('USERNAME')}
                    value={user.username}
                    canEdit={true}
                    passwordRequired={true}
                    showDialogFunc={showChangeUsernameDialog}/>
                <EditableProperty
                    id={'email'}
                    name={t('EMAIL')}
                    value={user.email.email}
                    canEdit={true}
                    passwordRequired={true}
                    showDialogFunc={showChangeEmailDialog}/>
                <TextAreaWithEmoji
                    id={'about'}
                    name={t('ABOUT_ME')}
                    value={user.profile.about}
                    w={'100%'}
                    h={'150px'}
                    borderRadius={0}
                    bg={'rgba(255, 255, 255, 0.02)'}
                    maxLength={300}
                    toolbarEnabled={true}
                    toolbarHeight={50}
                    toolbarBg={'none'}
                    emojiPickerEnabled={true}
                    emojiPickerButtonTextSize={20}
                    enableMaxCharacterCounter={true}
                    fontSize={'sm'}
                    resize={'none'}
                    isSaving={isAboutSaving}
                    onSave={onAboutSave}
                    border={'none'}
                    _hover={{
                        bg: 'rgba(255, 255, 255, 0.02)',
                        border: 'none',
                        boxShadow: 'none',
                    }}
                    _active={{
                        bg: 'rgba(255, 255, 255, 0.02)',
                        border: 'none',
                        boxShadow: 'none',
                    }}
                    _focus={{
                        bg: 'rgba(255, 255, 255, 0.02)',
                        border: 'none',
                        boxShadow: 'none',
                    }}
                />
            </VStack>
        </Box>

        <VStack spacing={'20px'} align={'stretch'}>
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
                <Button bg={'red.600'} borderRadius={0} _hover={{
                    bg: 'red.500',
                }} fontSize={'13px'} onClick={onDeleteAccountAction}>
                    {t('DELETE')}
                </Button>
            </SettingsSection>
        </VStack>
    </VStack>;
};

export default WithAuth(Account, {
    name: 'Account',
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as React.FC;