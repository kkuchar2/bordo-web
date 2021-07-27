import {animatedWindowProps} from "components/FormComponents/animation.js";
import {renderFormError} from "components/FormComponents/FormErrorRenderer.js";
import withErrors from "components/withErrors.jsx"
import {Button, Input, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {selectorForgotPassword, trySendForgotPassword} from "appRedux/reducers/api/account";
import {getResponseError} from "util/api_util.js";

import {
    buttonTheme,
    descriptionTextTheme, errorTextTheme,
    justRememberedTextTheme, spinnerTheme,
    StyledForgotPasswordForm,
    StyledJustRemembered,
    StyledLink, StyledUnknownError,
    titleTextTheme
} from "components/FormComponents/ForgotPassword/style.js";

const InputWithError = withErrors(Input);

const ForgotPasswordForm = () => {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');

    const forgotPasswordState = useSelector(selectorForgotPassword);
    const errors = forgotPasswordState.errors;

    const dispatch = useDispatch();

    const onEmailChange = useCallback(v => setEmail(v), []);

    const sendResetPasswordRequest = useCallback(e => {
        e.preventDefault();
        dispatch(trySendForgotPassword(email));
    }, [email]);

    const renderButton = useCallback(() => {
        if (!forgotPasswordState.requestPending) {
            return <Button text={t('FORGOT_PASSWORD_BUTTON')} theme={buttonTheme} onClick={sendResetPasswordRequest}/>;
        }
        else {
            return <Spinner theme={spinnerTheme} text={''}/>;
        }
    }, [email, forgotPasswordState]);

    const renderNetworkError = () => {
        if (errors === 'network_error') {
            return <StyledUnknownError>
                <Text theme={errorTextTheme} text={"Could not connect to server"}/>
            </StyledUnknownError>;
        }
    };

    let formError = getResponseError(errors, 'non_field_errors');

    return <StyledForgotPasswordForm {...animatedWindowProps}>
        <form onSubmit={sendResetPasswordRequest} className={'form'} autoComplete="none">

            <Text style={{textAlign: "center"}} theme={titleTextTheme} text={t('FORGOT_PASSWORD_FORM_TITLE')}/>
            <Text style={{marginTop: 20, marginBottom: 30}}
                  theme={descriptionTextTheme}
                  text={t('FORGOT_PASSWORD_INSTRUCTION')}/>

            <InputWithError id={'email'} type={'text'} placeholder={t('ENTER_EMAIL_INPUT_PLACEHOLDER')} onChange={onEmailChange} errors={errors} disabled={false} />

            {renderNetworkError()}
            {renderFormError(formError)}

            <div className={"buttonGroup"}>
                {renderButton()}
            </div>

            <StyledJustRemembered>
                <Text theme={justRememberedTextTheme} text={t('PASSWORD_JUST_REMEMBERED')}/>
                <StyledLink style={{marginLeft: 10, marginBottom: 0}} to={'/'} className={"signInLink"}>{t('SIGN_IN')}</StyledLink>
            </StyledJustRemembered>
        </form>
    </StyledForgotPasswordForm>;
};

export default ForgotPasswordForm;