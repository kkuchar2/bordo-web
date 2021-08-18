import {selectorForgotPassword, trySendForgotPassword} from "appRedux/reducers/api/account";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {
    buttonTheme,
    formTitleTheme,
    questionTextTheme,
    spinnerTheme,
    StyledLink,
    StyledQuestionWithLinkTheme
} from "components/FormComponents/commonStyles.js";

import {descriptionTextTheme, StyledForgotPasswordForm} from "components/FormComponents/ForgotPassword/style.js";
import {FormErrors} from "components/FormComponents/FormErrors/FormErrors.jsx";
import withErrors from "components/withErrors.jsx";
import {Button, Input, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

const InputWithError = withErrors(Input);

const ForgotPasswordForm = () => {
    const {t} = useTranslation();

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
        const path = forgotPasswordState.path;
        const isForgotPasswordContext = path === 'forgotPassword';
        const isRequestPending = forgotPasswordState.requestSent && !forgotPasswordState.responseReceived;

        if (isForgotPasswordContext && isRequestPending) {
            return <Spinner theme={spinnerTheme} text={"Sending reset password request"}/>;
        }
        return <Button text={t('FORGOT_PASSWORD_BUTTON')} theme={buttonTheme} onClick={sendResetPasswordRequest}/>;
    }, [email, forgotPasswordState]);

    return <StyledForgotPasswordForm {...animatedWindowProps}>
        <form onSubmit={sendResetPasswordRequest} className={'form'} autoComplete="none">

            <Text theme={formTitleTheme} text={t('FORGOT_PASSWORD_FORM_TITLE')}/>
            <Text theme={descriptionTextTheme} text={t('FORGOT_PASSWORD_INSTRUCTION')}/>

            <InputWithError id={'email'} type={'text'} title={'E-mail:'}
                            placeholder={t('ENTER_EMAIL_INPUT_PLACEHOLDER')} onChange={onEmailChange} errors={errors}
                            disabled={false}/>

            <FormErrors errors={errors} translation={t}/>

            <div className={"buttonGroup"}>
                {renderButton()}
            </div>

            <StyledQuestionWithLinkTheme>
                <Text theme={questionTextTheme} text={t('PASSWORD_JUST_REMEMBERED')}/>
                <StyledLink style={{marginLeft: 10, marginBottom: 0}} to={'/'}
                            className={"signInLink"}>{t('SIGN_IN')}</StyledLink>
            </StyledQuestionWithLinkTheme>
        </form>
    </StyledForgotPasswordForm>;
};

export default ForgotPasswordForm;