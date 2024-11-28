import React, { useCallback, useEffect } from 'react';

import { FieldValues } from 'react-hook-form/dist/types';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { FormConfig } from '@/components/Forms/formConfig';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { DialogProps } from '@/state/reducers/dialog/dialogSlice.types';
import { useAppDispatch } from '@/state/store';

export interface ChangePropertyDialogProps<TFieldValues extends FieldValues> {
    queryFunction: any;
    formConfig: FormConfig<TFieldValues>;
    propertyName: string;
    initialValues: TFieldValues;
}

export const ChangePropertyDialog = <TFieldValues extends FieldValues>(
    props: DialogProps<ChangePropertyDialogProps<TFieldValues>>
) => {

    const { dialog, data } = props;

    const { onCancel } = dialog;

    const { formConfig, queryFunction, initialValues, propertyName } = data;

    const query = queryFunction();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (query.isSuccess) {
            dispatch(closeDialog());
        }
    }, [query.isSuccess, propertyName]);

    const onCancelRequest = useCallback(() => {
        if (onCancel) {
            onCancel();
        }
        else {
            dispatch(closeDialog());
        }
    }, [onCancel]);

    const onSubmit = useCallback((values: TFieldValues) => {
        query.mutate(values);
    }, []);

    return <div className={'w-full min-w-[400px]'}>
        <Form<TFieldValues>
            config={formConfig}
            className={'w-full'}
            submitButtonTextKey={'CONFIRM'}
            submitButtonClassName={'rounded-md bg-white/5 px-5 py-2 text-sm font-medium text-white hover:bg-white/10'}
            validationResponse={query.error?.validationResponse}
            initialValues={initialValues}
            disabled={query.isLoading}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}/>

        <DelayedTransition pending={query.isLoading}/>
    </div>;
};