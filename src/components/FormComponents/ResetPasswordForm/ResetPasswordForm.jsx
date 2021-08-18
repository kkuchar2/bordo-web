import {selectorResetPassword, trySendResetPassword} from "appRedux/reducers/api/account";
import {descriptionTextTheme, titleTextTheme} from "components/Dialogs/ConfirmationDialog/style.js";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {buttonTheme, spinnerTheme, StyledButtonGroup} from "components/FormComponents/commonStyles.js";
import {FormErrors} from "components/FormComponents/FormErrors/FormErrors.jsx";
import {StyledResetPasswordFormComponent} from "components/FormComponents/ResetPasswordForm/style.js";
import withErrors from "components/withErrors.jsx";
import {Button, Input, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

const InputWithError = withErrors(Input);

const ResetPasswordForm = (props) => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const [disabled, setDisabled] = useState(false);

    const dispatch = useDispatch();

    const resetPasswordState = useSelector(selectorResetPassword);
    const errors = resetPasswordState.errors;

    const onOldPasswordChange = useCallback(setOldPassword, []);

    const onNewPassword1Change = useCallback(setNewPassword1, []);

    const onNewPassword2Change = useCallback(setNewPassword2, []);

    const attemptResetPassword = useCallback(e => {
        e.preventDefault();
        const tokenArr = props.token.split(':');
        const uid = tokenArr[0];
        const token = tokenArr[1];
        dispatch(trySendResetPassword(newPassword1, newPassword2, uid, token));
        setDisabled(true);
    }, [oldPassword, newPassword1, newPassword2]);

    useEffect(() => setDisabled(resetPasswordState.requestPending), [resetPasswordState]);

    const renderButton = useCallback(() => {
        console.log(resetPasswordState);

        if (!resetPasswordState.requestPending) {
            return <Button text={"Change password"} theme={buttonTheme} />;
        }
        else {
            return <Spinner theme={spinnerTheme} text={''} />;
        }
    }, [resetPasswordState]);

    return <StyledResetPasswordFormComponent {...animatedWindowProps}>
        <form onSubmit={attemptResetPassword} className={'form'} autoComplete="none">
            <Text theme={titleTextTheme} text={"Password reset"}/>
            <Text theme={descriptionTextTheme} text={"Choose your new password"}/>

            <InputWithError id={'new_password1'} title={"Password"} type={'password'} placeholder={"New password"}
                            onChange={onNewPassword1Change} errors={errors} disabled={disabled}/>

            <InputWithError id={'new_password2'} title={"Confirm password"} type={'password'}
                            placeholder={"Confirm new password"}
                            onChange={onNewPassword2Change} errors={errors} disabled={disabled}/>

            <FormErrors errors={errors}/>

            <StyledButtonGroup>{renderButton()}</StyledButtonGroup>
        </form>
    </StyledResetPasswordFormComponent>;
};

export default ResetPasswordForm;