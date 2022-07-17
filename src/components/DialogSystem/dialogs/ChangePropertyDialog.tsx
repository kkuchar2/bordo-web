import React, {useCallback, useEffect} from "react";

import {useCloseWithRequestSuccess} from "components/DialogSystem/hooks";
import Form from "components/Forms/Form/Form";
import {useSelector} from "react-redux";
import {closeDialog} from "state/reducers/dialog/dialogSlice";
import {BaseDialogProps, DialogProps} from "state/reducers/dialog/dialogSlice.types";
import {resetAccountSliceRequestState} from "state/services/accountService";
import {RequestStatus, ResponseArgs} from "tools/client/client.types";

import {useRequestState} from "../../../api/api_util";
import {useFormConfig} from "../../../api/formConfig";

export interface ChangePropertyDialogProps {
    requestStateSelector: <TState = unknown, > (state: TState) => ResponseArgs;
    dispatchFunc: any;
    formConfigKey: string;
    requestStateName: string;
    initialArgs: any;
}

export const ChangePropertyDialog = (props: DialogProps<ChangePropertyDialogProps> & BaseDialogProps) => {

    const { dialog, data, dispatch, t } = props;

    const { onCancel } = dialog;

    const { formConfigKey, requestStateSelector, dispatchFunc, requestStateName, initialArgs } = data;

    const requestState = useSelector(requestStateSelector);
    const errors = requestState.info.errors;
    const pending = useRequestState(requestState, RequestStatus.Waiting);
    const formConfig = useFormConfig(formConfigKey, t);

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

    const onSubmit = useCallback((formData: any) => {
        dispatch(dispatchFunc({ ...formData }));
    }, []);

    return <Form
        config={formConfig}
        className={'mb-[20px] ml-[20px] mr-[20px]'}
        buttonsClasses={'w-full flex justify-end mt-[20px]'}
        submitButtonText={t('CONFIRM')}
        errors={errors}
        initialValues={initialArgs}
        disabled={pending}
        onCancel={onCancelRequest}
        onSubmit={onSubmit}/>;
};