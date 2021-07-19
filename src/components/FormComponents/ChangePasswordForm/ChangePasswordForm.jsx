import {animatedWindowProps} from "components/FormComponents/animation.js";

import {renderFormError} from "components/FormComponents/FormErrorRenderer.js";
import InputWithError from "components/InputWithError.jsx";
import {Button, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearAuthErrors, selectorAuth, trySendChangePassword} from "appRedux/reducers/api/account";
import {getResponseError} from "util/api_util.js";

import {
    buttonTheme,
    changePasswordTextTheme,
    errorTextTheme,
    signInTextTheme,
    StyledButtonGroup,
    StyledChangePasswordFormComponent,
    StyledUnknownError
} from "components/FormComponents/ChangePasswordForm/style.js";

const ChangePasswordForm = (props) => {
    const [password, setPassword] = useState('');

    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();

    const authState = useSelector(selectorAuth);

    const errors = authState ? authState.errors : [];

    const onPasswordChange = useCallback(setPassword, []);

    const attemptChangePassword = useCallback(e => {
        e.preventDefault();
        dispatch(trySendChangePassword(password));
        setDisabled(true);
    }, [password]);

    useEffect(() => dispatch(clearAuthErrors()), []);

    const renderChangePasswordButton = useCallback(() => {
        if (status !== 'SENT_PASSWORD_REQUEST') {
            return <Button text={"Change password"} theme={buttonTheme}/>;
        }
        else {
            return <Spinner/>;
        }
    }, [status]);

    useEffect(() => {
        if (status === 'ERROR' || errors && Object.keys(errors).length > 0) {
            setDisabled(false);
        }
    }, [errors]);

    const renderUnknownError = useCallback(() => {
        if (!status || !errors) {
            return;
        }
        if (status === "ERROR" && Object.keys(errors).length === 0) {
            return <StyledUnknownError>
                <Text theme={errorTextTheme} text={"Something went wrong"}/>
            </StyledUnknownError>;
        }
    }, [status, errors]);

    const renderNetworkError = () => {
        if (status === "ERROR" && errors === 'network_error') {

            return <StyledUnknownError>
                <Text theme={errorTextTheme} text={"Could not connect to server"}/>
            </StyledUnknownError>;
        }
    };

    let formError = getResponseError(errors, 'non_field_errors');

    return <StyledChangePasswordFormComponent {...animatedWindowProps}>
        <form onSubmit={attemptChangePassword} className={'form'} autoComplete="none">
            <Text style={{textAlign: "center"}} theme={changePasswordTextTheme} text={"Password reset"}/>
            <Text style={{textAlign: "center", marginTop: 30, marginBottom: 10}} theme={signInTextTheme}
                  text={"Choose your new password"}/>

            <InputWithError id={'password'} title={"Password"} type={'password'} placeholder={"New password"}
                            onChange={onPasswordChange} errors={errors} disabled={disabled}/>

            {renderNetworkError()}
            {renderUnknownError()}
            {renderFormError(formError)}

            <StyledButtonGroup>{renderChangePasswordButton()}</StyledButtonGroup>
        </form>
    </StyledChangePasswordFormComponent>;
};

export default ChangePasswordForm;