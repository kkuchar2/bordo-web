import { useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { deleteAccountForm } from '@/components/Forms/formConfig';
import { DeleteAccountFormArgs } from '@/components/Forms/formConfig.types';
import { googleDisconnect } from '@/queries/account';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { useAppDispatch } from '@/state/store';

export const DisconnectGoogleDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const { isLoading, error, mutate } = googleDisconnect();

    const onSubmit = useCallback((formData: any) => {
        mutate({ ...formData });
    }, []);

    const onCancelRequest = useCallback(() => {
        dispatch(closeDialog());
    }, []);

    return <div className={'flex max-w-[400px] flex-col gap-[20px]'}>
        <div className={'bg-red-800/20 p-4'}>
            <div className={'text-sm font-medium'}>
                {t('DISCONNECT_GOOGLE_ACCOUNT_WARNING')}
            </div>
        </div>

        <Form<DeleteAccountFormArgs>
            config={deleteAccountForm}
            error={error?.data}
            submitButtonTextKey={'DISCONNECT_ACCOUNT'}
            submitButtonClassName={'rounded-md bg-white/5 px-5 py-2 text-sm font-medium text-white-50 hover:bg-white/10'}
            disabled={isLoading}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}/>
        <DelayedTransition pending={isLoading}/>
    </div>;
};