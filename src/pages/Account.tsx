import React, {useCallback} from 'react';

import {Box, Button, Center, Flex, VStack} from '@chakra-ui/react';
import {KeyIcon} from '@heroicons/react/24/outline';
import {TextAreaWithEmoji} from 'components/chakra/TextAreaWithEmoji/TextAreaWithEmoji';
import {GoogleAccountConnection} from 'components/ConnectedAccount/GoogleAccountConnection';
import {
    showChangeEmailDialog,
    showChangePasswordDialog,
    showChangeUsernameDialog,
    showDeleteAccountDialog
} from 'components/DialogSystem/readyDialogs';
import EditableProfilePictureProperty from 'components/EditableProperties/EditableProfilePictureProperty';
import EditableProperty from 'components/EditableProperties/EditableProperty';
import {SettingsSection} from 'components/Settings/SettingsSection';
import {useTranslation} from 'react-i18next';

import {queryClient} from '../App';
import WithAuth from '../hoc/WithAuth';
import {changeAbout, deleteAccount, getUser} from '../queries/account';
import {User} from '../queries/account/types';

const Account = () => {

    const { t } = useTranslation();

    const { isIdle, isLoading: isAboutSaving, isSuccess: isAboutSavingSuccess, mutate } = changeAbout();

    const hasUsablePassword = queryClient.getQueryData<User>(['user'])?.has_usable_password;

    const {
        isLoading: deleteAccountLoading,
        error: deleteAccountError,
        data: deleteAccountData,
        isSuccess: deleteAccountSuccess,
        mutate: deleteAccountMutate
    } = deleteAccount();

    const { data: user } = getUser();

    const onDeleteAccountAction = useCallback(() => {
        showDeleteAccountDialog();
    }, [user]);

    const onAboutSave = useCallback((value: string) => {
        mutate({ about: value });
    }, []);

    return <VStack spacing={'30px'} w={'600px'} h={'100%'} justify={'flex-start'} p={5} align={'stretch'}>
        <Box bg={'#2a2a2a'} borderRadius={'10px'} p={'15px'}>
            <Center>
                <EditableProfilePictureProperty username={user.username}/>
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
                    borderRadius={'10px'}
                    bg={'#232323'}
                    maxLength={300}
                    toolbarEnabled={true}
                    toolbarHeight={50}
                    toolbarBg={'none'}
                    emojiPickerEnabled={true}
                    emojiPickerButtonTextSize={20}
                    enableMaxCharacterCounter={true}
                    fontSize={'md'}
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
            <SettingsSection title={t('PASSWORD AND AUTHENTICATION')} show={hasUsablePassword}>
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

            <SettingsSection title={t('SOCIAL_ACCOUNTS')}>
                <Flex align={'center'} justify={'flex-start'} w={'100%'}>
                    <GoogleAccountConnection connection={user?.google_account}/>
                </Flex>
            </SettingsSection>

            <SettingsSection title={t('ACCOUNT_REMOVAL_SECTION_TITLE')}>
                <Button bg={'red.600'} _hover={{
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