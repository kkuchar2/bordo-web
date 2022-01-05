import React, {useCallback, useState} from 'react';

import {selectorAuth, tryLogin} from "appRedux/reducers/api/account";
import { ErroredInput } from 'components/ErroredInput/ErroredInput';
import {defaultShowUpAnimation} from "components/Forms/animation";
import {
    buttonTheme,
    formFieldTheme,
    formTitleTheme, questionTextTheme,
    spinnerTheme, StyledButtonGroup, StyledForm, StyledLink, StyledQuestionWithLinkTheme
} from "components/Forms/commonStyles";
import {FormErrors} from "components/Forms/FormErrors/FormErrors";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {StyledTitles, AnimatedText, StyledLoginPage, titleTheme} from "./style";

const LoginPage = () => {

    const {t} = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const authState = useSelector(selectorAuth);
    const isRequestPending = authState.requestState.pending;
    const isLoginContext = authState.path === 'account/login';

    const errors = authState.errors;

    const attemptLogin = useCallback(e => {
        e.preventDefault();
        dispatch(tryLogin(email, password));
    }, [email, password]);

    const renderSignInButton = useCallback(() => {
        if (isLoginContext && isRequestPending) {
            return <Spinner theme={spinnerTheme} text={t('SIGNING_IN_PROGRESS')}/>;
        }
        return <Button text={t('SIGN_IN')} type={"submit"} theme={buttonTheme} disabled={isRequestPending}/>;
    }, [authState]);

    const disabled = isLoginContext && isRequestPending;

    return <StyledLoginPage>
        <StyledTitles>
            <AnimatedText {...defaultShowUpAnimation}>
                <Text theme={titleTheme} text={t("PAGE_TITLE")}/>
            </AnimatedText>
        </StyledTitles>

        <StyledForm onSubmit={attemptLogin}>
            <Text theme={formTitleTheme} text={t('SIGN_IN')}/>

            <ErroredInput
                theme={formFieldTheme(disabled)}
                id={'email'}
                type={'text'}
                title={'E-mail:'}
                placeholder={t('ENTER_EMAIL_INPUT_PLACEHOLDER')}
                onChange={setEmail}
                errors={errors}
                disabled={isLoginContext && isRequestPending}
                autoComplete={"on"}/>

            <ErroredInput
                theme={formFieldTheme(disabled)}
                id={'password'}
                type={'password'}
                title={t('INPUT_PASSWORD_TITLE')}
                placeholder={t('ENTER_PASSWORD_INPUT_PLACEHOLDER')}
                onChange={setPassword}
                errors={errors}
                disabled={isLoginContext && isRequestPending}
            />

            <FormErrors errors={errors} translation={t}/>

            <StyledLink style={{marginTop: 40}} to={'/forgotPassword'}>{t('FORGOT_PASSWORD')}</StyledLink>

            <StyledButtonGroup>{renderSignInButton()}</StyledButtonGroup>

            <StyledQuestionWithLinkTheme>
                <Text theme={questionTextTheme} text={t('NEED_ACCOUNT')}/>
                <StyledLink to={'/register'}>{t('CREATE_ACCOUNT')}</StyledLink>
            </StyledQuestionWithLinkTheme>
        </StyledForm>
    </StyledLoginPage>;
};

export default EnsureAuthorized(LoginPage) as React.FC;