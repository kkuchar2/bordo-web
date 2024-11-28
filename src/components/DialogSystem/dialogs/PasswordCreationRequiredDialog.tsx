import React, { useCallback, useEffect } from 'react';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import { showDialogAfterFirstPasswordSetupRequest } from '@/components/DialogSystem/readyDialogs';
import Form from '@/components/Forms/Form/Form';
import { resetPasswordForm } from '@/components/Forms/formConfig';
import { CreateNewPasswordFormArgs } from '@/components/Forms/formConfig.types';
import { createNewPassword } from '@/queries/account';
import { closeDialog, setCloseable } from '@/state/reducers/dialog/dialogSlice';
import { DialogProps } from '@/state/reducers/dialog/dialogSlice.types';
import { useAppDispatch } from '@/state/store';

export const PasswordCreationRequiredDialog = (props: DialogProps) => {

    const { dialog  } = props;

    const { onCancel } = dialog;

    const createNewPasswordQuery = createNewPassword();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (createNewPasswordQuery.isSuccess) {
            showDialogAfterFirstPasswordSetupRequest();
        }
        else if (createNewPasswordQuery.isError) {
            dispatch(closeDialog());
        }
    }, [createNewPasswordQuery]);

    const onCancelRequest = useCallback(() => {
        if (onCancel) {
            onCancel();
        }
        else {
            dispatch(closeDialog());
        }
    }, [onCancel]);

    const onSubmit = useCallback(async (formData: CreateNewPasswordFormArgs) => {
        dispatch(setCloseable(false));
        createNewPasswordQuery.mutate(formData);
    }, []);

    return <div className={'flex w-full flex-col gap-3'}>
        <Form<CreateNewPasswordFormArgs>
            config={resetPasswordForm}
            submitButtonTextKey={'SET_NEW_PASSWORD'}
            useCancelButton={false}
            disabled={createNewPasswordQuery.isPending}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}
            initialValues={{
                new_password: '',
                new_password_confirm: ''
            }}/>
        <DelayedTransition pending={createNewPasswordQuery.isPending}/>
    </div>;
};