import React, {useCallback, useEffect, useMemo} from "react";

import {closeDialog} from "appRedux/reducers/application";
import {DialogProps} from "appRedux/reducers/application/dialogSlice.types";
import { resetUserSliceRequestState } from "appRedux/services/authService";
import {useAppDispatch} from "appRedux/store";
import {useCloseWithRequestSuccess} from "components/DialogSystem/hooks";
import Form from "components/Forms/Form/Form";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {RequestStatus, ResponseArgs} from "tools/client/client.types";

import { useMemoRequestState} from "../../../api/api_util";
import {FORM_CONFIG, getConfig} from "../../../api/formConfig";

export interface DisconnectFromGoogleAccountDialogProps {
    requestStateSelector: <TState = unknown, REq = unknown> (state: TState) => ResponseArgs;
    dispatchFunc: any;
    formConfigKey: string;
}

export const DisconnectFromGoogleAccountDialog = (props: DialogProps<DisconnectFromGoogleAccountDialogProps>) => {

    const { dialog, data } = props;

    const { onCancel } = dialog;
    const { formConfigKey, requestStateSelector, dispatchFunc } = data;

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const requestState = useSelector(requestStateSelector);
    const errors = requestState.info.errors;
    const pending = useMemoRequestState(requestState, RequestStatus.Waiting);

    const formConfig = useMemo(() => getConfig(FORM_CONFIG, formConfigKey, t), [t, formConfigKey]);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('disconnectFromGoogle'));
        };
    }, []);

    useCloseWithRequestSuccess(dispatch, requestState);

    const onCancelRequest = useCallback((e) => {
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
        errors={errors}
        disabled={pending}
        onCancel={onCancelRequest}
        onSubmit={onSubmit}/>;
};