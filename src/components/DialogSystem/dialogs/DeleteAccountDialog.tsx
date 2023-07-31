import React, { useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { deleteAccountForm } from '@/components/Forms/formConfig';
import { DeleteAccountFormArgs } from '@/components/Forms/formConfig.types';
import { deleteAccount } from '@/queries/account';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { useAppDispatch } from '@/state/store';

export const DeleteAccountDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const deleteAccountQuery = deleteAccount();

    const onSubmit = useCallback((formData: DeleteAccountFormArgs) => {
        deleteAccountQuery.mutate({ ...formData });
    }, []);

    const onCancelRequest = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    useEffect(() => {
        if (deleteAccountQuery.isSuccess) {
            dispatch(closeDialog());
        }
    }, [deleteAccountQuery.isSuccess]);

    return <div className={'flex max-w-[400px] flex-col gap-5'}>
        <div className={'rounded-md bg-red-800/20 p-4 text-sm font-medium'}>
            {t('DELETE_ACCOUNT_WARNING')}
        </div>

        <Form<DeleteAccountFormArgs>
            config={deleteAccountForm}
            error={deleteAccountQuery.error?.data}
            submitButtonClassName={'bg-red-900 hover:bg-red-800'}
            submitButtonTextKey={'DELETE_ACCOUNT_PERMANENTLY'}
            disabled={deleteAccountQuery.isLoading}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}
            initialValues={{
                current_password: '',
            }}
        />
        <DelayedTransition pending={deleteAccountQuery.isLoading}/>
    </div>;
};