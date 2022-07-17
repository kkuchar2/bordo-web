import React, {useCallback, useEffect} from "react";

import Form from "components/Forms/Form/Form";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {closeDialog} from "state/reducers/dialog/dialogSlice";
import {deleteAccount, resetAccountSliceRequestState} from "state/services/accountService";
import {RootState, useAppDispatch} from "state/store";
import {RequestStatus} from "tools/client/client.types";

import {isSuccess, useRequestState} from "../../../api/api_util";
import {useFormConfig} from "../../../api/formConfig";

export const DeleteAccountDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const userState = useSelector((state: RootState) => state.account.user);
    const requestState = useSelector((state: RootState) => state.account.requests.deleteAccount);
    const pending = useRequestState(requestState, RequestStatus.Waiting);
    const errors = requestState.info.errors;

    const formConfig = useFormConfig('deleteAccount', t);

    useEffect(() => {
        return () => {
            dispatch(resetAccountSliceRequestState('deleteAccount'));
        };
    }, []);

    const onSubmit = useCallback((formData: any) => {
        dispatch(deleteAccount(userState.email.email, { ...formData }));
    }, [userState]);

    const onCancelRequest = useCallback((e) => {
        dispatch(closeDialog());
    }, []);

    useEffect(() => {
        if (isSuccess(requestState)) {
            dispatch(closeDialog());
        }
    }, [requestState]);

    return <div className={'w-[400px]'}>
        <div className={'dialog-warning'}>
            {t('DELETE_ACCOUNT_WARNING')}
        </div>

        <Form
            config={formConfig}
            className={'mb-[20px] ml-[20px] mr-[20px]'}
            buttonsClasses={'w-full flex justify-end mt-[20px]'}
            errors={errors}
            disabled={pending}
            onCancel={onCancelRequest}
            onSubmit={onSubmit}/>
    </div>;
};