import {renderFormError} from "components/forms/FormErrorRenderer.js";
import {renderInput} from "components/InputWithError.jsx";

import {Button, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectorRegistration, tryRegister} from "redux/reducers/api/account";
import styled from "styled-components";
import {getResponseError} from "util/api_util";

const signUpTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "25px"
};

const createNewAccountTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

const justRememberedTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

const errorTextTheme = {
    textColor: "#ff4949",
    fontSize: "15px"
};

const buttonTheme = {
    width: "200px",
    height: "40px",
    background: "#474747",
    disabledBackground: "rgba(47,47,47,0.43)",
    hoverBackground: "#5c5c5c",
    border: "none",
    borderRadius: "6px",

    text: {
        fontSize: "14px",
        textColor: "#bbbbbb",
        disabledTextColor: "rgba(255,255,255,0.20)"
    }
};

const StyledLink = styled(Link)`
  color: #cbcbcb;
  position: relative;

  &:hover {
    color: #00a6ff;
  }
`;

const StyledJustRemembered = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const StyledButtonGroup = styled.div`
  margin-top: 20px;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 50px;
`;

const StyledUnknownError = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const StyledRegistrationFormComponent = styled.div`
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
      width: 320px;
      position: relative;
    }

    @media (max-width: 600px) {
      width: 100%;
    }

    .formTitle {
      font-weight: 600;
      font-size: 24px;
      line-height: 30px;
      color: white;
    }

    .formDescription {
      margin-top: 23px;
      margin-bottom: 20px;
      font-size: 16px;
      color: #aaaaaa;
      font-weight: 300;
    }

    .input {
      margin-top: 10px;
      width: 100%;
      background: #242426;

      .inputField {
        background: none;
        color: white;
      }

      &.noError {
        border: none;
        border-radius: 5px;
      }
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

    .forgotPassword {
      margin-top: 10px;
      color: #4fa5de;
      font-size: 12pt;

      margin-left: 10px;
      text-decoration: none;

      &:hover {
        cursor: pointer;
        color: lighten(#4fa5de, 10%);
      }
    }

    .buttonGroup {
      width: 100%;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .button {
        box-sizing: border-box;
        margin-top: 10px;
        width: 280px;
        height: 50px;
        font-size: 12pt;
        align-items: center;
        justify-content: center;
        display: flex;
        padding: 0;
        font-family: "Whitney Medium", sans-serif;
        border: none;
        border-radius: 5px;
        line-height: 50px;
        background: #404040;
        color: white;

        &:hover {
          background: #4562d4;
        }
      }
    }

    .loginLink {
      margin-top: 20px;
      margin-left: 5px;
      color: #4fa5de;
      font-size: 12pt;
      text-decoration: none;

      &:hover {
        cursor: pointer;
        color: lighten(#4fa5de, 10%);
      }
    }
  }
`;

function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    const registrationState = useSelector(selectorRegistration);

    const status = registrationState ? registrationState.status : 'ERROR';
    const errors = registrationState ? registrationState.errors : [];

    const onEmailChange = useCallback(setEmail, []);

    const onPasswordChange = useCallback(setPassword, []);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(tryRegister(email, password));
        setDisabled(true);
    };

    useEffect(() => {
        if (status === 'ERROR' || errors && Object.keys(errors).length > 0) {
            setDisabled(false);
        }
    }, [errors]);

    const renderUnknownError = () => {
        if (status === "ERROR" && (Object.keys(errors).length === 0 || errors === 'unknown_error')) {
            // setDisabled(false);
            return <StyledUnknownError>
                <Text theme={errorTextTheme} text={"Something went wrong"}/>
            </StyledUnknownError>;
        }
    };

    const renderSignUpButton = () => {
        if (status === 'INIT' || status === 'ERROR') {
            return <Button text={"Sign up"} theme={buttonTheme}/>;
        }
        else if (status === 'SENT_REGISTRATION_REQUEST') {
            return <Spinner/>;
        }
    };

    let formError = getResponseError(errors, 'non_field_errors');

    return <StyledRegistrationFormComponent>
        <form onSubmit={handleSubmit} className={'form'} autoComplete="none">
            <Text theme={signUpTextTheme} text={"Sign up 🤗"}/>
            <Text style={{marginTop: 20, marginBottom: 20}} theme={createNewAccountTextTheme}
                  text={"Create new account"}/>

            {renderInput('email', "Email address", 'text', "Enter your email address", "on", onEmailChange, errors, disabled)}
            {renderInput('password', "Password", 'password', "Select your password", "on", onPasswordChange, errors, disabled)}

            {renderUnknownError()}
            {renderFormError(formError)}

            <StyledButtonGroup>{renderSignUpButton()}</StyledButtonGroup>

            <StyledJustRemembered>
                <Text theme={justRememberedTextTheme} text={"Just remembered?"}/>
                <StyledLink style={{marginLeft: 10, marginBottom: 2}} to={'/'}>Login</StyledLink>
            </StyledJustRemembered>
        </form>
    </StyledRegistrationFormComponent>;
}

export default RegistrationForm;