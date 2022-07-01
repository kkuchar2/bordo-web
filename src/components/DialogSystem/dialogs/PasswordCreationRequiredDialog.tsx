import React, {useCallback, useEffect} from "react";

import {useAuthSelector} from "appRedux/reducers/api/auth/accountSlice";
import {closeDialog, setCloseable} from "appRedux/reducers/application";
import {DialogProps} from "appRedux/reducers/application/dialogSlice.types";
import {resetUserSliceRequestState} from "appRedux/services/authService";
import {useAppDispatch} from "appRedux/store";
import {showDialogAfterFirstPasswordSetupRequest} from "components/DialogSystem/readyDialogs";
import Form from "components/Forms/Form/Form";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {RequestStatus} from "tools/client/client.types";

import {isFailure, isSuccess, useMemoRequestState} from "../../../api/api_util";
import {useFormConfig} from "../../../api/formConfig";

import {ChangePropertyDialogProps} from "./ChangePropertyDialog";

export const PasswordCreationRequiredDialog = (props: DialogProps<ChangePropertyDialogProps>) => {

    const { dialog, data } = props;

    const { onCancel } = dialog;
    const { formConfigKey, requestStateSelector, dispatchFunc, requestStateName } = data;

    const userState = useAuthSelector('user');

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const formConfig = useFormConfig(formConfigKey, t);

    const requestState = useSelector(requestStateSelector);
    const errors = requestState.info.errors;
    const pending = useMemoRequestState(requestState, RequestStatus.Waiting);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState(requestStateName));
        };
    }, []);

    useEffect(() => {

        if (isSuccess(requestState)) {
            showDialogAfterFirstPasswordSetupRequest();
        }
        else if (isFailure(requestState)) {
            dispatch(closeDialog());
        }
    }, [requestState, t]);

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
        dispatch(dispatchFunc(userState.email.email));
    }, [userState]);

    return <>
        <Form
            config={formConfig}
            className={'pb-[20px] pr-[20px]'}
            buttonsClasses={'w-full flex justify-end'}
            submitButtonText={"Set new password"}
            errors={errors}
            useCancelButton={false}
            disabled={pending}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}/>
        <div className={'flex'}>
            {pending ? <progress className="progress w-full bg-gray-600 h-[5px] progress-accent"></progress> : null}
        </div>
    </>;
};