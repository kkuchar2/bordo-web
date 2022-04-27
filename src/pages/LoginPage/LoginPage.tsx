import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {CircularProgress} from '@mui/material';
import {getLoginState, resetUserSliceRequestState} from 'appRedux/reducers/api/user/userSlice';
import {login} from "appRedux/services/userService";
import {useAppDispatch} from 'appRedux/store';
import {showConfirmEmailDialog} from "components/Dialogs/readyDialogs";
import {FormErrors} from "components/Errors/FormErrors/FormErrors";
import {
    buttonTheme,
    formTitleTheme,
    questionTextTheme,
    StyledButtonGroup,
    StyledCenteredSection,
    StyledForm,
    StyledLink,
    StyledQuestionWithLinkTheme
} from "components/Forms/commonStyles";
import {InputWithError} from 'components/InputWithError/InputWithError';
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {Button, Text} from "kuchkr-react-component-library";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {isEmailNotVerifiedError} from "tools/errors/errors";

import {isWaiting} from "../../api/api_util";
import {FORM_CONFIG, getConfig} from "../../api/formConfig";

import {StyledLoginPage} from "./style";

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginState = useSelector(getLoginState);

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const cfg = useMemo(() => getConfig(FORM_CONFIG, 'login', t), [t]);

    const isRequestPending = useMemo(() => isWaiting(loginState), [loginState]);

    const errors = loginState.info.errors;

    useEffect(() => {

        const isEmailNotVerified = isEmailNotVerifiedError(errors);

        if (isEmailNotVerified) {
            showConfirmEmailDialog({ dispatch, translation: t, data: { email: email, }});
        }
    }, [errors]);

    useEffect(() => {
        return () => {
            dispatch(resetUserSliceRequestState('login'));
        };
    }, []);

    const attemptLogin = useCallback(e => {
        e.preventDefault();
        dispatch(login(email, password));
    }, [email, password]);

    // We can create one component that is either a spinner or a button
    const renderSignInButton = useCallback(() => {
        if (isRequestPending) {
            return <CircularProgress/>;
        }
        return <Button text={t('SIGN_IN')} type={"submit"} theme={buttonTheme} disabled={isRequestPending}/>;
    }, [loginState]);

    return <StyledLoginPage>
        <StyledCenteredSection>
            <StyledForm onSubmit={attemptLogin}>
                <Text theme={formTitleTheme} text={t('SIGN_IN')}/>

                <InputWithError
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    errors={errors}
                    disabled={isRequestPending}
                    {...cfg['email']}/>

                <InputWithError
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    errors={errors}
                    disabled={isRequestPending}
                    {...cfg['password']}/>

                <FormErrors errors={errors} translation={t}/>

                <StyledLink style={{ marginTop: 40 }} to={'/forgotPassword'}>{t('FORGOT_PASSWORD')}</StyledLink>

                <StyledButtonGroup>{renderSignInButton()}</StyledButtonGroup>

                <StyledQuestionWithLinkTheme>
                    <Text theme={questionTextTheme} text={t('NEED_ACCOUNT')}/>
                    <StyledLink to={'/register'}>{t('CREATE_ACCOUNT')}</StyledLink>
                </StyledQuestionWithLinkTheme>
            </StyledForm>
        </StyledCenteredSection>
    </StyledLoginPage>;
};

export default EnsureAuthorized(LoginPage) as React.FC;