import React, {useCallback, useEffect, useState} from 'react';

import {
    selectorForgotPassword,
    tryResetForgotPasswordState,
    trySendForgotPassword
} from "appRedux/reducers/api/account";
import {useAppDispatch} from "appRedux/store";
import {RequestStatus} from "axios-client-wrapper";
import {descriptionTextTheme} from "components/Dialogs/commonStyles";
import {showSentResetPasswordMailDialog} from "components/Dialogs/readyDialogs";
import {ErroredInput} from 'components/ErroredInput/ErroredInput';
import * as style from "components/Forms/commonStyles";
import {FormErrors} from "components/Forms/FormErrors/FormErrors";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {StyledForgotPasswordPage} from "./style";

const ForgotPasswordPage = () => {

    const {t} = useTranslation();

    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [initialized, setInitialized] = useState(false);

    const forgotPasswordState = useSelector(selectorForgotPassword);
    const errors = forgotPasswordState.errors;

    const dispatch = useAppDispatch();

    const onEmailChange = useCallback(v => setEmail(v), []);

    console.log(forgotPasswordState);

    useEffect(() => setDisabled(forgotPasswordState.requestState.pending), [forgotPasswordState]);

    const sendResetPasswordRequest = useCallback(e => {
        e.preventDefault();
        dispatch(trySendForgotPassword({email}));
    }, [email]);

    const renderButton = useCallback(() => {
        const path = forgotPasswordState.path;
        const isForgotPasswordContext = path === 'account/forgotPassword';
        const isRequestPending = forgotPasswordState.requestState.pending;

        if (isForgotPasswordContext && isRequestPending) {
            return <div style={{marginTop: 30}}>
                <Spinner theme={style.spinnerTheme} text={t("SENDING_PASSWORD_RESET_REQUEST")}/>
            </div>;
        }
        return <Button text={t('FORGOT_PASSWORD_BUTTON')} theme={style.buttonTheme}
                       onClick={sendResetPasswordRequest}/>;
    }, [email, forgotPasswordState]);

    useEffect(() => {
        console.log('RESSETING STATE');
        dispatch(tryResetForgotPasswordState());
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (!initialized) {
            return;
        }

        const path = forgotPasswordState.path;
        const isCtx = path === 'account/forgotPassword';
        const isSuccess = forgotPasswordState.requestState.status === RequestStatus.Success;

        if (isCtx && isSuccess) {
            showSentResetPasswordMailDialog(dispatch, navigate, t);
        }

    }, [forgotPasswordState, initialized, t]);

    return <StyledForgotPasswordPage>
        <style.StyledForm onSubmit={sendResetPasswordRequest}>
            <Text theme={style.formTitleTheme} text={t('FORGOT_PASSWORD_FORM_TITLE')}/>
            <Text theme={descriptionTextTheme} text={t('FORGOT_PASSWORD_INSTRUCTION')}/>

            <ErroredInput
                theme={style.formFieldTheme(disabled)}
                id={'email'}
                type={'email'}
                title={'E-mail:'}
                placeholder={t('ENTER_EMAIL_INPUT_PLACEHOLDER')}
                onChange={onEmailChange}
                errors={errors}
                autoComplete={'on'}
                disabled={disabled}/>

            <FormErrors errors={errors} translation={t}/>

            {renderButton()}

            <style.StyledQuestionWithLinkTheme>
                <Text theme={style.questionTextTheme} text={t('PASSWORD_JUST_REMEMBERED')}/>
                <style.StyledLink to={'/'}>{t('SIGN_IN')}</style.StyledLink>
            </style.StyledQuestionWithLinkTheme>
        </style.StyledForm>
    </StyledForgotPasswordPage>;
};

export default ForgotPasswordPage;