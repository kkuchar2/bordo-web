import React, {useCallback, useEffect} from 'react';

import {useAuthSelector} from "appRedux/reducers/api/auth/accountSlice";
import {googleLogin, login, resetUserSliceRequestState} from "appRedux/services/authService";
import {useAppDispatch} from 'appRedux/store';
import Box from 'components/Box/Box';
import {showConfirmEmailDialog} from "components/DialogSystem/readyDialogs";
import {StyledCenteredSection, StyledLink} from "components/Forms/commonStyles";
import Form from 'components/Forms/Form/Form';
import GoogleButton from "components/GoogleButton/GoogleButton";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {useTranslation} from "react-i18next";
import {RequestStatus} from "tools/client/client.types";
import {isEmailNotVerifiedError} from "tools/errors/errors";

import {useMemoRequestState} from "../../api/api_util";
import {useFormConfig} from "../../api/formConfig";
import {GOOGLE_CLIENT_ID} from "../../config";

import {StyledLoginPage} from "./style";
import UserAgreements from "./UserAgreements";

const LoginPage = () => {

    const requestState = useAuthSelector('login');

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const formConfig = useFormConfig('login', t);

    const pending = useMemoRequestState(requestState, RequestStatus.Waiting);

    const errors = requestState.info.errors;

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('login'));
        };
    }, []);

    useEffect(() => {
        const isEmailNotVerified = isEmailNotVerifiedError(errors);

        if (isEmailNotVerified) {
            // TODO: fill correct email
            showConfirmEmailDialog({ data: { email: "TODO", } });
        }
    }, [errors]);

    const attemptLogin = useCallback((formData: any) => {
        const { email, password } = formData;
        dispatch(login(email, password));
    }, []);

    const onSignInWithGoogle = useCallback((credentialResponse: any) => {
        dispatch(googleLogin(credentialResponse));
    }, []);

    return <StyledLoginPage>
        <StyledCenteredSection>
            <Box className={'dark_form'}>
                <Form
                    title={t('SIGN_IN')}
                    customDescription={<UserAgreements/>}
                    submitButtonText={t('SIGN_IN')}
                    errors={errors}
                    disabled={pending}
                    config={formConfig}
                    confirmButtonClassName={'main_form_button'}
                    useCancelButton={false}
                    onSubmit={attemptLogin}/>

                <StyledLink to={'/forgotPassword'} className={'my-8 text-[14px]'}>
                    {t('FORGOT_PASSWORD_QUESTION')}
                </StyledLink>

                <GoogleButton
                    clientId={GOOGLE_CLIENT_ID}
                    context={'signin'}
                    text={'continue_with'}
                    className={'flex justify-center'}
                    onSuccess={onSignInWithGoogle}/>

                <div className={'flex items-center justify-center mt-8 mb-[10px]'}>
                    <div className={'text-white text-[14px]'}>{t('NEED_ACCOUNT')}</div>
                    <StyledLink className={'ml-3 text-[14px]'} to={'/register'}>{t('CREATE_ACCOUNT')}</StyledLink>
                </div>
            </Box>
        </StyledCenteredSection>
    </StyledLoginPage>;
};

LoginPage.displayName = 'LoginPage';

export default EnsureAuthorized(LoginPage) as React.FC;