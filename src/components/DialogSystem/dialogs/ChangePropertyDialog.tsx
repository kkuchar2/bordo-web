import React, { useCallback, useEffect } from 'react';

import { FieldValues } from 'react-hook-form/dist/types';

import { DelayedTransition } from '@/components/DelayedTransition/DelayedTransition';
import Form from '@/components/Forms/Form/Form';
import { FormConfig } from '@/components/Forms/formConfig';
import { closeDialog } from '@/state/reducers/dialog/dialogSlice';
import { BaseDialogProps, DialogProps } from '@/state/reducers/dialog/dialogSlice.types';

export interface ChangePropertyDialogProps<TFieldValues extends FieldValues> {
    queryFunction: any;
    formConfig: FormConfig<TFieldValues>;
    propertyName: string;
    initialValues: TFieldValues;
}

export const ChangePropertyDialog = <TFieldValues extends FieldValues>(
    props: DialogProps<ChangePropertyDialogProps<TFieldValues>> & BaseDialogProps
) => {

    const { dialog, data, dispatch } = props;

    const { onCancel } = dialog;

    const { formConfig, queryFunction, initialValues, propertyName } = data;

    const query = queryFunction();

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

    return <div className={'w-full'}>
        <Form<TFieldValues>
            config={formConfig}
            className={'w-full'}
            submitButtonTextKey={'CONFIRM'}
            error={query.error?.data}
            initialValues={initialValues}
            disabled={query.isLoading}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}/>

        <DelayedTransition pending={query.isLoading}/>
    </div>;
};