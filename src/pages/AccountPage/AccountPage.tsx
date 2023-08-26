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
import { getFirebaseApp } from '@/firebase/firebaseApp';
import WithAuth from '@/hoc/WithAuth';

const AccountPage = () => {

    const { t } = useTranslation();

    const app = getFirebaseApp();
    const auth = getAuth(app);

    const firebaseUser = auth.currentUser;

    const onDeleteAccountAction = useCallback(() => {
        showDeleteAccountDialog();
    }, []);

    if (firebaseUser == null) {
        return null;
    }

    return <div className={'flex h-full w-full bg-neutral-800'}>
        <div className={'flex h-full w-full items-start justify-center overflow-auto'}>
            <div className={'flex w-[800px] flex-col gap-[30px] p-[50px]'}>
                <h1 className={'text-3xl font-semibold tracking-tighter'}>
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
            </div>
        </div>
    </div>;
};

export default WithAuth(AccountPage, {
    name: 'AccountPage',
    isPublic: false,
    redirectToHomeOnAutologin: false,
    redirectToLoginPageOnUnauthenticated: true
});