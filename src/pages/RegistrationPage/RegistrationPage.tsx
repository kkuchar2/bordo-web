import React, {useCallback, useEffect} from 'react';

import {useAuthSelector} from "appRedux/reducers/api/auth/accountSlice";
import {googleLogin, register, resetUserSliceRequestState} from "appRedux/services/authService";
import {useAppDispatch} from "appRedux/store";
import Box from "components/Box/Box";
import {showRegistrationCompleteDialog} from "components/DialogSystem/readyDialogs";
import {StyledCenteredSection, StyledLink} from "components/Forms/commonStyles";
import Form from 'components/Forms/Form/Form';
import GoogleButton from "components/GoogleButton/GoogleButton";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {useTranslation} from "react-i18next";
import {RequestStatus} from "tools/client/client.types";

import {isSuccess, useMemoRequestState} from "../../api/api_util";
import {useFormConfig} from "../../api/formConfig";
import {GOOGLE_CLIENT_ID} from "../../config";
import UserAgreements from "../LoginPage/UserAgreements";

import {StyledRegistrationPage} from "./style";

const RegistrationPage = () => {

    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const requestState = useAuthSelector('registration');

    const errors = requestState.info.errors;

    const pending = useMemoRequestState(requestState, RequestStatus.Waiting);

    const formConfig = useFormConfig('registration', t);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('registration'));
        };
    }, []);

    useEffect(() => {
        if (isSuccess(requestState)) {
            showRegistrationCompleteDialog();
        }
    }, [requestState, t]);

    const attemptRegister = useCallback((formData: any) => {
        const { email, username, password } = formData;
        dispatch(register(email, username, password));
    }, []);

    const onSignInWithGoogle = useCallback((credentialResponse: any) => {
        dispatch(googleLogin(credentialResponse));
    }, []);

    return <StyledRegistrationPage>
        <StyledCenteredSection>
            <Box className={'dark_form'}>
                <Form
                    title={t('REGISTRATION')}
                    customDescription={<UserAgreements/>}
                    submitButtonText={t('SIGN_UP')}
                    errors={errors}
                    disabled={pending}
                    config={formConfig}
                    useCancelButton={false}
                    buttonsClasses={'pt-[20px] flex justify-center'}
                    confirmButtonClassName={'main_form_button'}
                    onSubmit={attemptRegister}/>

                <GoogleButton
                    clientId={GOOGLE_CLIENT_ID}
                    context={'signin'}
                    text={'signin_with'}
                    className={'mt-8 flex justify-center'}
                    onSuccess={onSignInWithGoogle}/>

                <div className={'flex items-center justify-center mt-[20px] mb-[10px]'}>
                    <div className={'text-white text-[14px]'}>{t('ALREADY_HAVE_ACCOUNT')}</div>
                    <StyledLink className={'ml-3 text-[14px]'} to={'/'}>{t('SIGN_IN')}</StyledLink>
                </div>
            </Box>
        </StyledCenteredSection>
    </StyledRegistrationPage>;
};

export default EnsureAuthorized(RegistrationPage) as React.FC;