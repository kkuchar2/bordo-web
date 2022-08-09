import React, {useCallback, useEffect} from 'react';

import {Box, Progress} from '@chakra-ui/react';
import {useCloseWithRequestSuccess} from 'components/DialogSystem/hooks';
import Form from 'components/Forms/Form/Form';
import {showSuccess} from 'components/Toast/readyToastNotifications';
import {useSelector} from 'react-redux';
import {closeDialog} from 'state/reducers/dialog/dialogSlice';
import {BaseDialogProps, DialogProps} from 'state/reducers/dialog/dialogSlice.types';
import {resetAccountSliceRequestState} from 'state/services/accountService';
import {RootState} from 'state/store';
import {RequestStatus} from 'tools/client/client.types';

import {isSuccess, useRequestState} from '../../../api/api_util';
import {useFormConfig} from '../../../api/formConfig';

export interface ChangePropertyDialogProps {
    requestStateSelectorName: string;
    dispatchFunc: any;
    formConfigKey: string;
    requestStateName: string;
    propertyName: string;
    initialArgs: any;
}

export const ChangePropertyDialog = (props: DialogProps<ChangePropertyDialogProps> & BaseDialogProps) => {

    const { dialog, data, dispatch, t } = props;

    const { onCancel } = dialog;

    const { formConfigKey, requestStateSelectorName, dispatchFunc, requestStateName, initialArgs, propertyName } = data;

    const requestState = useSelector((state: RootState) => state.account.requests[requestStateSelectorName]);
    const errors = requestState.info.errors;
    const pending = useRequestState(requestState, RequestStatus.Waiting);
    const formConfig = useFormConfig(formConfigKey, t);

    useEffect(() => {
        if (isSuccess(requestState)) {
            showSuccess(`${t('SUCCESS')} 🎉`);
        }
    }, [requestState, propertyName]);

    useEffect(() => {
        return () => {
            dispatch(resetAccountSliceRequestState(requestStateName));
        };
    }, []);

    useCloseWithRequestSuccess(dispatch, requestState);

    const onCancelRequest = useCallback(() => {
        if (onCancel) {
            onCancel();
        }
        else {
            dispatch(closeDialog());
        }
    }, [onCancel]);

    const onSubmit = useCallback((formData: FormData) => {
        dispatch(dispatchFunc(formData));
    }, []);

    return <Box p={3}>
        <Form
            config={formConfig}
            submitButtonText={t('CONFIRM')}
            errors={errors}
            initialValues={initialArgs}
            disabled={pending}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}/>
        {pending ? <Progress size={'xs'} mt={2} isIndeterminate/> : null}
    </Box>;
};