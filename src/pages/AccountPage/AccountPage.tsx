'use client';

import { FC, useCallback } from 'react';

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
import { EditableProfilePictureProperty } from '@/components/EditableProperties/EditableProfilePictureProperty';
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

    return <div className={'flex h-full w-[800px] flex-col items-stretch gap-[30px] px-[50px]'}>
        <h1 className={'mt-[50px] text-3xl font-semibold tracking-tighter'}>
            {t('ACCOUNT_SETTINGS')}
        </h1>

        <div className={'flex flex-col gap-[50px] pt-[50px]'}>
            <div className={'grid place-items-center'}>
                <EditableProfilePictureProperty/>
            </div>
            <div className={'flex w-full flex-col items-stretch gap-[50px]'}>
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
            </div>
        </div>

        <div className={'flex flex-col gap-[20px]'}>
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
                <div className={'flex w-full items-center justify-end'}>
                    <GoogleAccountConnection connection={google_account}/>
                </div>
            </SettingsSection>

            <SettingsSection title={t('ACCOUNT')}>
                <button className={'rounded-md bg-red-600 p-2 text-sm font-semibold hover:bg-red-500'}
                    onClick={onDeleteAccountAction}>
                    {t('DELETE_ACCOUNT')}
                </button>
            </SettingsSection>
        </div>
    </div>;
};

export default WithAuth(AccountPage, {
    name: 'Account',
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
}) as FC;