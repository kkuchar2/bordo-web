'use client';

import { useCallback } from 'react';

import { getAuth } from '@firebase/auth';
import { KeyIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'react-i18next';

import {
    showUpdateEmailDialog,
    showUpdatePasswordDialog,
    showDeleteAccountDialog
} from '@/components/DialogSystem/readyDialogs';
import { EditableProfilePictureProperty } from '@/components/EditableProperties/EditableProfilePictureProperty';
import EditableProperty from '@/components/EditableProperties/EditableProperty';
import { SettingsSection } from '@/components/Settings/SettingsSection';
import { TextAreaWithEmoji } from '@/components/TextAreaWithEmoji/TextAreaWithEmoji';
import { initializeFirebase } from '@/firebase/firebaseApp';
import { changeAbout, getUser } from '@/queries/account';

const AccountPage = () => {

    const { t } = useTranslation();

    const { isLoading: isAboutSaving, mutate } = changeAbout();

    const { data: user } = getUser();

    const app = initializeFirebase();
    const auth = getAuth(app);

    const firebaseUser = auth.currentUser;

    const onDeleteAccountAction = useCallback(() => {
        showDeleteAccountDialog();
    }, [user]);

    const onAboutSave = useCallback((value: string) => {
        mutate({ about: value });
    }, []);

    if (user == null || firebaseUser == null) {
        return null;
    }

    const { username, profile, google_account } = user;

    return <div className={'flex h-full w-[800px] flex-col items-stretch gap-[30px] px-[50px]'}>
        <h1 className={'mt-[50px] text-3xl font-semibold tracking-tighter'}>
            {t('ACCOUNT_SETTINGS')}
        </h1>

        <div className={'flex flex-col gap-[50px] pt-[50px]'}>
            <div className={'flex flex-col gap-5'}>
                <div className={'grid place-items-center'}>
                    <EditableProfilePictureProperty/>
                </div>
                <div className={'flex flex-col gap-2'}>
                    <div className={'w-full text-center text-xl font-medium'}>
                        {firebaseUser.displayName}
                    </div>
                    <div className={'w-full text-center text-sm'}>
                        {firebaseUser.email}
                    </div>
                </div>
            </div>
            <div className={'flex w-full flex-col items-stretch gap-[50px]'}>
                <EditableProperty
                    id={'email'}
                    name={t('EMAIL')}
                    editText={'UPDATE'}
                    value={firebaseUser.email}
                    canEdit={true}
                    showDialogFunc={showUpdateEmailDialog}/>
                <TextAreaWithEmoji
                    id={'about'}
                    name={t('ABOUT_ME')}
                    value={profile.about}
                    toolbarEnabled={true}
                    emojiPickerEnabled={true}
                    emojiPickerButtonTextSize={20}
                    enableMaxCharacterCounter={true}
                    isSaving={isAboutSaving}
                    onSave={onAboutSave}
                />
            </div>
        </div>

        <div className={'flex flex-col gap-[20px]'}>
            <SettingsSection title={t('PASSWORD_AND_AUTHENTICATION')}>
                <EditableProperty
                    id={'password'}
                    name={t('UPDATE_PASSWORD')}
                    editText={'UPDATE_PASSWORD'}
                    canEdit={true}
                    hideTitle={true}
                    icon={{
                        component: KeyIcon,
                        color: '#ffb700',
                        size: 20
                    }}
                    showDialogFunc={showUpdatePasswordDialog}
                />
            </SettingsSection>

            <SettingsSection title={t('ACCOUNT')}>
                <button className={'rounded-md bg-white/5 px-5 py-2 text-sm font-medium text-red-500 hover:bg-white/10 hover:text-red-600'}
                    onClick={onDeleteAccountAction}>
                    {t('DELETE_ACCOUNT')}
                </button>
            </SettingsSection>
        </div>
    </div>;
};

export default AccountPage;