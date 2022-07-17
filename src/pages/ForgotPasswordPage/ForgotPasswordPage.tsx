import React, {useCallback, useEffect} from 'react';

import Box from 'components/Box/Box';
import {showDialogAfterPasswordResetRequest} from "components/DialogSystem/readyDialogs";
import {StyledLink} from "components/Forms/commonStyles";
import Form from "components/Forms/Form/Form";
import {useTranslation} from "react-i18next";
import {useSelector} from 'react-redux';
import {forgotPassword, resetAccountSliceRequestState} from "state/services/accountService";
import {RootState, useAppDispatch} from "state/store";
import {RequestStatus} from "tools/client/client.types";

import {isSuccess, useRequestState} from "../../api/api_util";
import {useFormConfig} from "../../api/formConfig";

import {StyledForgotPasswordPage} from "./style";

const ForgotPasswordPage = () => {

    const requestState = useSelector((state: RootState) => state.account.requests.forgotPassword);

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const pending = useRequestState(requestState, RequestStatus.Waiting);

    const requestErrors = requestState.info.errors;

    const formConfig = useFormConfig('forgotPassword', t);

    useEffect(() => {
        return () => {
            dispatch(resetAccountSliceRequestState('forgotPassword'));
        };
    }, []);

    const requestPasswordReset = useCallback((formData: any) => {
        const { email } = formData;
        dispatch(forgotPassword(email));
    }, []);

    useEffect(() => {
        if (isSuccess(requestState)) {
            showDialogAfterPasswordResetRequest();
        }

    }, [requestState, t]);

    return <StyledForgotPasswordPage>
        <Box className={'dark_form'}>
            <Form
                title={t('RESET_PASSWORD')}
                description={t('RESET_PASSWORD_DESCRIPTION')}
                submitButtonText={t('RESET_PASSWORD')}
                errors={requestErrors}
                disabled={pending}
                config={formConfig}
                confirmButtonClassName={'main_form_button'}
                useCancelButton={false}
                onSubmit={requestPasswordReset}/>

            <div className={'flex items-center justify-center mt-[10px]'}>
                <div className={'text-white text-[14px]'}>{t('PASSWORD_JUST_REMEMBERED')}</div>
                <StyledLink className={'ml-3 text-[14px]'} to={'/'}>{t('SIGN_IN')}</StyledLink>
            </div>
            <div className={'h-[10px]'}>
                {pending ?
                    <progress className="progress w-full mt-2 bg-gray-600 h-[10px] progress-accent"></progress> : null}
            </div>
        </Box>
    </StyledForgotPasswordPage>;
};

export default ForgotPasswordPage;