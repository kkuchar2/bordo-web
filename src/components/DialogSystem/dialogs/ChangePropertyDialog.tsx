import React, {useCallback, useEffect} from 'react';

import {Box} from '@chakra-ui/react';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import Form from 'components/Forms/Form/Form';
import {closeDialog} from 'state/reducers/dialog/dialogSlice';
import {BaseDialogProps, DialogProps} from 'state/reducers/dialog/dialogSlice.types';

import {useFormConfig} from '../../../api/formConfig';

export interface ChangePropertyDialogProps {
    queryFunc: any;
    formConfigKey: string;
    propertyName: string;
    initialArgs: any;
}

export const ChangePropertyDialog = (props: DialogProps<ChangePropertyDialogProps> & BaseDialogProps) => {

    const { dialog, data, dispatch, t } = props;

    const { onCancel } = dialog;

    const { formConfigKey, queryFunc, initialArgs, propertyName } = data;

    console.log('QUERY FUNC: ', queryFunc);

    const {
        isIdle,
        isLoading,
        isError,
        error,
        isSuccess,
        mutate
    } = queryFunc();

    const formConfig = useFormConfig(formConfigKey, t);

    useEffect(() => {
        if (isSuccess) {
            dispatch(closeDialog());
        }
    }, [isSuccess, propertyName]);

    const onCancelRequest = useCallback(() => {
        if (onCancel) {
            onCancel();
        }
        else {
            dispatch(closeDialog());
        }
    }, [onCancel]);

    const onSubmit = useCallback((formData: FormData) => {
        console.log('FORM DATA: ', formData);
        mutate(formData);
    }, []);

    return <Box p={3}>
        <Form
            config={formConfig}
            submitButtonText={t('CONFIRM')}
            error={error?.data}
            initialValues={initialArgs}
            disabled={isLoading}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}
            fieldsSpacing={'20px'}
            contentSpacing={'10px'}
            buttonsStackProps={{
                pt: { base: 2, sm: 2, md: 1, lg: 1 },
            }}/>
        <DelayedTransition pending={isLoading}/>
    </Box>;
};