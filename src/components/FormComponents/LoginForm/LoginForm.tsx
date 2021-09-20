 import React, {useCallback, useEffect, useState} from "react";

import {selectorAuth, tryLogin} from "appRedux/reducers/api/account";
import {defaultShowUpAnimation} from "components/FormComponents/animation";
import {
    buttonTheme,
    formTitleTheme,
    questionTextTheme,
    spinnerTheme,
    StyledButtonGroup,
    StyledLink,
    StyledQuestionWithLinkTheme
} from "components/FormComponents/commonStyles";
import {FormErrors} from "components/FormComponents/FormErrors/FormErrors";
import withErrors from "components/withErrors";
import {Button, Input, Spinner, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import { StyledLoginFormComponent } from "./style";

const InputWithError = withErrors(Input);

const LoginForm = () => {
    const {t} = useTranslation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch();
    const authState = useSelector(selectorAuth);
    const errors = authState.errors;

    const attemptLogin = useCallback(e => {
        e.preventDefault();
        dispatch(tryLogin(email, password));
        setDisabled(true);
    }, [email, password]);

    const renderSignInButton = useCallback(() => {
        const path = authState.path;
        const isLoginContext = path === 'login';
        const isRequestPending = authState.requestState.pending;

        if (isLoginContext && isRequestPending) {
            return <Spinner theme={spinnerTheme} text={t('SIGNING_IN_PROGRESS')}/>;
        }
        return <Button text={t('SIGN_IN')} theme={buttonTheme}/>;
    }, [authState]);

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setDisabled(false);
        }
    }, [errors]);

    return <StyledLoginFormComponent {...defaultShowUpAnimation}>
        <form onSubmit={attemptLogin} className={'form'} autoComplete="none">
            <Text theme={formTitleTheme} text={t('SIGN_IN')}/>

            <InputWithError
                id={'email'}
                type={'text'}
                title={'E-mail:'}
                placeholder={t('ENTER_EMAIL_INPUT_PLACEHOLDER')}
                onChange={setEmail}
                errors={errors}
                disabled={disabled}
                autoComplete={"on"}/>

            <InputWithError
                id={'password'}
                type={'password'}
                title={t('INPUT_PASSWORD_TITLE')}
                placeholder={t('ENTER_PASSWORD_INPUT_PLACEHOLDER')}
                onChange={setPassword}
                errors={errors}
                disabled={disabled}
            />

            <FormErrors errors={errors} translation={t}/>

            <StyledLink style={{marginTop: 40}} to={'/forgotPassword'}>{t('FORGOT_PASSWORD')}</StyledLink>

            <StyledButtonGroup>{renderSignInButton()}</StyledButtonGroup>

            <StyledQuestionWithLinkTheme>
                <Text theme={questionTextTheme} text={t('NEED_ACCOUNT')}/>
                <StyledLink style={{marginLeft: 10}} to={'/register'}>{t('CREATE_ACCOUNT')}</StyledLink>
            </StyledQuestionWithLinkTheme>
        </form>
    </StyledLoginFormComponent>;
};

export default LoginForm;