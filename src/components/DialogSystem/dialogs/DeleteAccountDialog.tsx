import React, {useCallback, useEffect} from "react";

import {useAuthSelector} from "appRedux/reducers/api/auth/accountSlice";
import {closeDialog} from "appRedux/reducers/application";
import {deleteAccount, resetUserSliceRequestState} from "appRedux/services/authService";
import {useAppDispatch} from "appRedux/store";
import Form from "components/Forms/Form/Form";
import {useTranslation} from "react-i18next";
import {RequestStatus} from "tools/client/client.types";

import {isSuccess, useMemoRequestState} from "../../../api/api_util";
import {useFormConfig} from "../../../api/formConfig";

export const DeleteAccountDialog = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const userState = useAuthSelector('user');
    const requestState = useAuthSelector('deleteAccount');
    const pending = useMemoRequestState(requestState, RequestStatus.Waiting);
    const errors = requestState.info.errors;

    const formConfig = useFormConfig('deleteAccount', t);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('deleteAccount'));
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