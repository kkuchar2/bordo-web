'use client';

import { FC, useCallback } from 'react';

import { KeyIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

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
import { getUser } from '@/queries/account';
import { User } from '@/queries/account/types';

const AccountPage = () => {

    const { t } = useTranslation();

    const hasUsablePassword = queryClient.getQueryData<User>(['user'])?.has_usable_password;

    const { data: user } = getUser();

    const onDeleteAccountAction = useCallback(() => {
        showDeleteAccountDialog();
    }, [user]);

    if (user == null) {
        return;
    }

    const { username, email } = user;

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
                    value={email}
                    canEdit={true}
                    passwordRequired={true}
                    showDialogFunc={showChangeEmailDialog}/>
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
                        size: 20
                    }}
                    showDialogFunc={showChangePasswordDialog}
                />
            </SettingsSection>

            <SettingsSection title={t('ACCOUNT')}>
                <button
                    className={'rounded-md bg-white/5 px-5 py-2 text-sm font-medium text-red-500 hover:bg-white/10 hover:text-red-600'}
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