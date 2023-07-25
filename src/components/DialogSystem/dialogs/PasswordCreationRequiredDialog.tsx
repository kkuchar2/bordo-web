import React, { useCallback, useEffect } from 'react';

import { DelayedTransition } from '@/components/chakra/DelayedTransition/DelayedTransition';
import { showDialogAfterFirstPasswordSetupRequest } from '@/components/DialogSystem/readyDialogs';
import Form from '@/components/Forms/Form/Form';
import { resetPasswordForm } from '@/components/Forms/formConfig';
import { CreateNewPasswordFormArgs } from '@/components/Forms/formConfig.types';
import { createNewPassword } from '@/queries/account';
import { closeDialog, setCloseable } from '@/state/reducers/dialog/dialogSlice';
import { BaseDialogProps, DialogProps } from '@/state/reducers/dialog/dialogSlice.types';

export const PasswordCreationRequiredDialog = (props: DialogProps & BaseDialogProps) => {

    const { dialog, dispatch } = props;
    const { onCancel } = dialog;
    const { isLoading, error, isError, data, isSuccess, mutate } = createNewPassword();

    useEffect(() => {
        if (isSuccess) {
            showDialogAfterFirstPasswordSetupRequest();
        }
        else if (isError) {
            dispatch(closeDialog());
        }
    }, [isSuccess]);

    const onCancelRequest = useCallback(() => {
        if (onCancel) {
            onCancel();
        }
        else {
            dispatch(closeDialog());
        }
    }, [onCancel]);

    const onSubmit = useCallback(() => {
        dispatch(setCloseable(false));
        mutate({});
    }, []);

    return <div className={'flex w-full flex-col gap-3'}>
        <Form<CreateNewPasswordFormArgs>
            config={resetPasswordForm}
            submitButtonTextKey={'SET_NEW_PASSWORD'}
            useCancelButton={false}
            disabled={isLoading}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}
            initialValues={{
                new_password: '',
                new_password_confirm: ''
            }}/>
        <DelayedTransition pending={isLoading}/>
    </div>;
};