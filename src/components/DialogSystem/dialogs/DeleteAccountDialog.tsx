import React, { useCallback, useEffect, useState } from 'react';

import {
    deleteUser, EmailAuthProvider,
    getAuth,
    GoogleAuthProvider, reauthenticateWithCredential, reauthenticateWithPopup
} from '@firebase/auth';
import { FirebaseError } from '@firebase/util';
import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { deleteAccountForm, emptyForm } from '@/components/Forms/formConfig';
import { DeleteAccountFormArgs, EmptyFormArgs } from '@/components/Forms/formConfig.types';
import { firebaseFieldErrorConvert } from '@/components/Forms/util';
import { queryClient } from '@/config';
import { getFirebaseApp } from '@/firebase/firebaseApp';
import { preDeleteAccount } from '@/queries/account';
import { QueryResponseErrorData } from '@/queries/base';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { useAppDispatch } from '@/state/store';

export const DeleteAccountDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const preDeleteAccountQuery = preDeleteAccount();

    const app = getFirebaseApp();
    const auth = getAuth(app);
    const firebaseUser = auth.currentUser;

    const [pending, setPending] = useState(false);
    const [firebaseError, setFirebaseError] = useState<QueryResponseErrorData | null>(null);

    const isGoogleProvider = firebaseUser?.providerData[0].providerId === 'google.com';

    const isPasswordProvider = firebaseUser?.providerData[0].providerId === 'password';

    const onSubmit = useCallback(async (formData: DeleteAccountFormArgs) => {
        if (!firebaseUser) return;
        if (!firebaseUser.email) return;

        const { current_password } = formData;

        setPending(true);

        const credential = EmailAuthProvider.credential(firebaseUser.email, current_password);

        try {
            await preDeleteAccountQuery.mutateAsync({});
        }
        catch (e) {
            console.error(e);
            return;
        }

        try {
            await reauthenticateWithCredential(firebaseUser, credential);
            await deleteUser(firebaseUser);
            dispatch(closeDialog());
        }
        catch (e) {
            const firebaseError = e as FirebaseError;

            if (firebaseError.code === 'auth/wrong-password') {
                setFirebaseError(firebaseFieldErrorConvert(firebaseError.code, 'current_password'));
            }
        }

        setPending(false);

    }, [firebaseUser]);

    const onSubmitWithGoogleProvider = useCallback(async () => {
        if (!firebaseUser) return;
        setPending(true);

        try {
            await preDeleteAccountQuery.mutateAsync({});
        }
        catch (e) {
            console.error(e);
            return;
        }

        try {
            await reauthenticateWithPopup(firebaseUser, new GoogleAuthProvider());
            await deleteUser(firebaseUser);
            queryClient.setQueryData(['user'], null);
            dispatch(closeDialog());
        }
        catch (e) {
            console.error(e);
        }
        finally {
            setPending(false);
        }

    }, [firebaseUser]);

    const onCancelRequest = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    useEffect(() => {
        if (preDeleteAccountQuery.isSuccess) {
            dispatch(closeDialog());
        }
    }, [preDeleteAccountQuery.isSuccess]);

    return <div className={'flex max-w-[400px] flex-col gap-5'}>
        <div className={'rounded-md bg-red-800/20 p-4 text-sm font-medium'}>
            {t('DELETE_ACCOUNT_WARNING')}
        </div>

        {isPasswordProvider && <Form<DeleteAccountFormArgs>
            config={deleteAccountForm}
            error={preDeleteAccountQuery.error?.data || firebaseError}
            submitButtonClassName={'rounded-md bg-white/5 px-5 py-2 text-sm font-medium text-red-500 hover:bg-white/10 hover:text-red-600'}
            submitButtonTextKey={'DELETE_ACCOUNT_PERMANENTLY'}
            disabled={preDeleteAccountQuery.isLoading || pending}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}
            initialValues={{
                current_password: '',
            }}
        />}

        {isGoogleProvider && <Form<EmptyFormArgs>
            config={emptyForm}
            error={null}
            submitButtonClassName={'rounded-md bg-white/5 px-5 py-2 text-sm font-medium text-red-500 hover:bg-white/10 hover:text-red-600'}
            submitButtonTextKey={'DELETE_ACCOUNT_PERMANENTLY'}
            disabled={pending}
            onCancel={onCancelRequest}
            onSubmit={onSubmitWithGoogleProvider}
            initialValues={{}}
        />}

        <DelayedTransition pending={preDeleteAccountQuery.isLoading || pending} />
    </div>;
};