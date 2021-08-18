import {animatedWindowProps} from "components/FormComponents/animation.js";
import {renderFormError} from "components/FormComponents/FormErrorRenderer.js";
import InputWithError from "components/InputWithError.jsx";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useState} from "react";
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

const ForgotPasswordForm = () => {

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
            return <Button text={"Send password reset link 🔑"} theme={buttonTheme} onClick={sendResetPasswordRequest}/>;
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

            <Text style={{textAlign: "center"}} theme={titleTextTheme} text={"Forgot your password?"}/>
            <div style={{marginTop: 10, width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <img src={"images/cyanide.png"} alt={""} width={150} height={150}/>
            </div>
            <Text style={{marginTop: 20, marginBottom: 30}}
                  theme={descriptionTextTheme}
                  text={"Enter your e-mail address and we'll send you a reset password link"}/>

            <InputWithError id={'password'} title={"Password"} type={'text'} placeholder={"Enter your email address"} onChange={onEmailChange} errors={errors} disabled={false} />

            {renderNetworkError()}
            {renderFormError(formError)}

            <div className={"buttonGroup"}>
                {renderButton()}
            </div>

            <StyledJustRemembered>
                <Text theme={justRememberedTextTheme} text={"Just remembered?"}/>
                <StyledLink style={{marginLeft: 10, marginBottom: 0}} to={'/'} className={"signInLink"}>Sign
                    in</StyledLink>
            </StyledJustRemembered>
        </form>
    </StyledForgotPasswordForm>;
};

export default ForgotPasswordForm;