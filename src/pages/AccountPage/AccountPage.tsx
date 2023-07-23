'use client';

import { FC, useCallback } from 'react';

import { Button, Center, Flex, VStack } from '@chakra-ui/react';
import { KeyIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import { TextAreaWithEmoji } from '@/components/chakra/TextAreaWithEmoji/TextAreaWithEmoji';
import { GoogleAccountConnection } from '@/components/ConnectedAccount/GoogleAccountConnection';
import {
    showChangeEmailDialog,
    showChangePasswordDialog,
    showChangeUsernameDialog,
    showDeleteAccountDialog
} from '@/components/DialogSystem/readyDialogs';
import EditableProfilePictureProperty from '@/components/EditableProperties/EditableProfilePictureProperty';
import EditableProperty from '@/components/EditableProperties/EditableProperty';
import { SettingsSection } from '@/components/Settings/SettingsSection';
import { queryClient } from '@/config';
import WithAuth from '@/hoc/WithAuth';
import { changeAbout, getUser } from '@/queries/account';
import { User } from '@/queries/account/types';

const AccountPage = () => {

    const { t } = useTranslation();

    const { isLoading: isAboutSaving, mutate } = changeAbout();

    const hasUsablePassword = queryClient.getQueryData<User>(['user'])?.has_usable_password;

    const { data: user } = getUser();

    const onDeleteAccountAction = useCallback(() => {
        showDeleteAccountDialog();
    }, [user]);

    const onAboutSave = useCallback((value: string) => {
        mutate({ about: value });
    }, []);

    if (user == null) {
        return;
    }

    const { username, email, profile, google_account } = user;

    return <VStack spacing={'30px'} w={'600px'} h={'100%'} justify={'flex-start'} p={5} align={'stretch'}>
        <div className={'flex flex-col gap-[50px] pt-[50px]'}>
            <Center>
                <EditableProfilePictureProperty username={username}/>
            </Center>
            <VStack spacing={'50px'} width={'100%'} align={'stretch'}>
                <EditableProperty
                    id={'username'}
                    name={t('USERNAME')}
                    value={username}
                    canEdit={true}
                    passwordRequired={true}
                    showDialogFunc={showChangeUsernameDialog}/>
                <EditableProperty
                    id={'email'}
                    name={t('EMAIL')}
                    value={email.email}
                    canEdit={true}
                    passwordRequired={true}
                    showDialogFunc={showChangeEmailDialog}/>
                <TextAreaWithEmoji
                    id={'about'}
                    name={t('ABOUT_ME')}
                    value={profile.about}
                    w={'100%'}
                    h={'150px'}
                    borderRadius={'10px'}
                    bg={'rgba(255,255,255,0.04)'}
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
        </div>

        <VStack spacing={'20px'} align={'stretch'}>
            <SettingsSection title={t('PASSWORD_AND_AUTHENTICATION')} show={hasUsablePassword}>
                <EditableProperty
                    id={'password'}
                    name={t('CHANGE_PASSWORD')}
                    editText={'CHANGE_PASSWORD'}
                    canEdit={true}
                    hideTitle={true}
                    passwordRequired={true}
                    icon={{
                        component: KeyIcon,
                        color: '#ffb700',
                    }}
                    showDialogFunc={showChangePasswordDialog}
                />
            </SettingsSection>

            <SettingsSection title={t('SOCIAL_ACCOUNTS')}>
                <Flex align={'center'} justify={'flex-end'} w={'100%'}>
                    <GoogleAccountConnection connection={google_account}/>
                </Flex>
            </SettingsSection>

            <SettingsSection title={t('ACCOUNT')}>
                <Button bg={'red.600'} _hover={{
                    bg: 'red.500',
                }} fontSize={'13px'} onClick={onDeleteAccountAction}>
                    {t('DELETE_ACCOUNT')}
                </Button>
            </SettingsSection>
        </VStack>
    </VStack>;
};

export default WithAuth(AccountPage, {
    name: 'Account',
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as FC;