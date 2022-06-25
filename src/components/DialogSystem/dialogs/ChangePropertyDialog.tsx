import React, {useCallback, useEffect} from "react";

import {closeDialog} from "appRedux/reducers/application";
import {DialogProps} from "appRedux/reducers/application/dialogSlice.types";
import {resetUserSliceRequestState} from "appRedux/services/authService";
import {useAppDispatch} from "appRedux/store";
import {useCloseWithRequestSuccess} from "components/DialogSystem/hooks";
import Form from "components/Forms/Form/Form";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {RequestStatus, ResponseArgs} from "tools/client/client.types";

import {useMemoRequestState} from "../../../api/api_util";
import {useFormConfig} from "../../../api/formConfig";

export interface ChangePropertyDialogProps {
    requestStateSelector: <TState = unknown, > (state: TState) => ResponseArgs;
    dispatchFunc: any;
    formConfigKey: string;
    requestStateName: string;
    initialArgs: any;
}

export const ChangePropertyDialog = (props: DialogProps<ChangePropertyDialogProps>) => {

    const { dialog, data } = props;

    const { onCancel } = dialog;

    const { formConfigKey, requestStateSelector, dispatchFunc, requestStateName, initialArgs } = data;

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const requestState = useSelector(requestStateSelector);
    const errors = requestState.info.errors;
    const pending = useMemoRequestState(requestState, RequestStatus.Waiting);
    const formConfig = useFormConfig(formConfigKey, t);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState(requestStateName));
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