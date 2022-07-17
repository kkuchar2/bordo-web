import React, {useCallback, useEffect} from 'react';

import Box from 'components/Box/Box';
import {showConfirmEmailDialog} from "components/DialogSystem/readyDialogs";
import {StyledCenteredSection, StyledLink} from "components/Forms/commonStyles";
import Form from 'components/Forms/Form/Form';
import GoogleButton from "components/GoogleButton/GoogleButton";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {useTranslation} from "react-i18next";
import {useSelector} from 'react-redux';
import {googleLogin, login, resetAccountSliceRequestState} from "state/services/accountService";
import {RootState, useAppDispatch} from "state/store";
import {RequestStatus} from "tools/client/client.types";
import {isEmailNotVerifiedError} from "tools/errors/errors";

import {useRequestState} from "../../api/api_util";
import {useFormConfig} from "../../api/formConfig";
import {GOOGLE_CLIENT_ID} from "../../config";

import {StyledLoginPage} from "./style";
import UserAgreements from "./UserAgreements";

const LoginPage = () => {

    const { t } = useTranslation();

    const requestState = useSelector((state: RootState) => state.account.requests.login);

    const dispatch = useAppDispatch();

    const formConfig = useFormConfig('login', t);

    const pending = useRequestState(requestState, RequestStatus.Waiting);

    const errors = requestState.info.errors;

    useEffect(() => {
        return () => {
            dispatch(resetAccountSliceRequestState('login'));
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