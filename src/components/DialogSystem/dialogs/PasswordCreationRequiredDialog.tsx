import React, {useCallback, useEffect} from "react";

import {showDialogAfterFirstPasswordSetupRequest} from "components/DialogSystem/readyDialogs";
import Form from "components/Forms/Form/Form";
import {useSelector} from "react-redux";
import {closeDialog, setCloseable} from "state/reducers/dialog/dialogSlice";
import {BaseDialogProps, DialogProps} from "state/reducers/dialog/dialogSlice.types";
import {resetAccountSliceRequestState} from "state/services/accountService";
import {RootState} from "state/store";
import {RequestStatus} from "tools/client/client.types";

import {isFailure, isSuccess, useRequestState} from "../../../api/api_util";
import {useFormConfig} from "../../../api/formConfig";

import {ChangePropertyDialogProps} from "./ChangePropertyDialog";

export const PasswordCreationRequiredDialog = (props: DialogProps<ChangePropertyDialogProps> & BaseDialogProps) => {

    const { dialog, data, dispatch, t } = props;
    const { onCancel } = dialog;
    const { formConfigKey, requestStateSelector, dispatchFunc, requestStateName } = data;

    const formConfig = useFormConfig(formConfigKey, t);

    const userState = useSelector((state: RootState) => state.account.user);

    const requestState = useSelector(requestStateSelector);
    const errors = requestState.info.errors;
    const pending = useRequestState(requestState, RequestStatus.Waiting);

    useEffect(() => {
        return () => {
            dispatch(resetAccountSliceRequestState(requestStateName));
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