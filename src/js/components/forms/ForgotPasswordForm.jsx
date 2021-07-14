import {Button, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useState} from "react";

import {renderInput} from "components/InputWithError.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getResponseError} from "util/api_util";
import {trySendResetPassword} from "redux/reducers/api/account";
import {Link} from "react-router-dom";
import {renderFormError} from "components/forms/FormErrorRenderer.js";
import styled from "styled-components";

const StyledForgotPasswordForm = styled.div`
  border-radius: 6px;
  background: #323232;
  box-shadow: 20px 20px 20px 0 rgba(0,0,0,.4);
  
  @media (max-width: 600px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }

  .form {
    border-radius: 6px;
    background: #323232;
    display: flex;
    flex-direction: column;
    padding: 30px 30px 30px;

    @media (min-width: 600px) {
      width: 350px;
      position: relative;
    }

    @media (max-width: 600px) {
      width: 100%;
    }

    .errorWrapper {
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      .errorIcon {
        color: rgb(186, 47, 47);
      }

      .errorText {
        margin-left: 10px;
        font-size: 16px;
        color: rgb(186, 47, 47);
      }
    }

    .buttonGroup {
      width: 100%;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

const buttonTheme = {
    width: "200px",
    height: "40px",
    background: "#00549a",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#004071",
    border: "none",
    borderRadius: "6px",

    text: {
        fontSize: "15px",
        textColor: "#bbbbbb",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

const titleTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "25px"
};

const descriptionTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

const justRememberedTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

const StyledLink = styled(Link)`
  color: #cbcbcb;
  position: relative;
  margin-left: 10px;
  margin-bottom: 2px;
  
  &:hover {
    color: #00a6ff;
  }
`;

const StyledJustRemembered = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

function ForgotPasswordForm() {

    const [email, setEmail] = useState('');

    const status = useSelector(state => state.auth.status);
    const errors = useSelector(state => state.auth.errors);
    const dispatch = useDispatch();

    const onEmailChange = useCallback(setEmail, []);

    const sendResetPasswordRequest = useCallback(e => {
        e.preventDefault();
        dispatch(trySendResetPassword(email));
    }, [email]);

    const renderButton = useCallback(() => {
        if (status !== 'SENT_PASSWORD_RESET') {
            return <Button text={"Reset password 🔑"} theme={buttonTheme} />;
        }
        else {
            return <Spinner visible={true} />;
        }
    }, [status]);

    let formError = getResponseError(errors, 'non_field_errors');

    return <StyledForgotPasswordForm>
        <form onSubmit={sendResetPasswordRequest} className={'form'} autoComplete="none">

            <Text theme={titleTextTheme} text={"Reset your password"} />
            <Text style={{marginTop: 20, marginBottom: 10}}
                  theme={descriptionTextTheme} text={"Enter your e-mail address and we'll send you a reset password link"} />

            {renderInput('email', "Email address", 'text', "Enter your email address", "on", onEmailChange, errors)}

            {renderFormError(formError)}

            <div className={"buttonGroup"}>
                {renderButton()}
            </div>

            <StyledJustRemembered>
                <Text theme={justRememberedTextTheme} text={"Just remembered?"}/>
                <StyledLink to={'/'} className={"signInLink"}>Sign in</StyledLink>
            </StyledJustRemembered>
        </form>
    </StyledForgotPasswordForm>;
}

export default ForgotPasswordForm;