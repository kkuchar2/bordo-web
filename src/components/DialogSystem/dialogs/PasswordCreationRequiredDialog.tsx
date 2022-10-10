import React, {useCallback, useEffect} from 'react';

import {Flex} from '@chakra-ui/react';
import {DelayedTransition} from 'components/chakra/DelayedTransition/DelayedTransition';
import {showDialogAfterFirstPasswordSetupRequest} from 'components/DialogSystem/readyDialogs';
import Form from 'components/Forms/Form/Form';
import {closeDialog, setCloseable} from 'state/reducers/dialog/dialogSlice';
import {BaseDialogProps, DialogProps} from 'state/reducers/dialog/dialogSlice.types';

import {useFormConfig} from '../../../api/formConfig';
import {createNewPassword} from '../../../queries/account';

import {ChangePropertyDialogProps} from './ChangePropertyDialog';

export const PasswordCreationRequiredDialog = (props: DialogProps<ChangePropertyDialogProps> & BaseDialogProps) => {

    const { dialog, dispatch, t } = props;
    const { onCancel } = dialog;
    const { isLoading, error, isError, data, isSuccess, mutate } = createNewPassword();

    const formConfig = useFormConfig('emptyForm', t);

    useEffect(() => {
        if (isSuccess) {
            showDialogAfterFirstPasswordSetupRequest();
        }
        else if (isError) {
            dispatch(closeDialog());
        }
    }, [isSuccess, t]);

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

    return <Flex direction={'column'} gap={'gap.small'}>
        <Form
            config={formConfig}
            submitButtonTextKey={'SET_NEW_PASSWORD'}
            useCancelButton={false}
            disabled={isLoading}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}
            buttonsStackProps={{
                p: { base: 2, sm: 2, md: 4, lg: 3 },
                m: 0
            }}/>
        <DelayedTransition pending={isLoading}/>
    </Flex>;
};