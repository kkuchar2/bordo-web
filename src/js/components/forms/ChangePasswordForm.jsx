import {Button, Spinner, Text} from "kuchkr-react-component-library";
import React, {useCallback, useState} from "react";
import InputWithError from "components/InputWithError.jsx";
import {onFieldChange} from "util/util";
import {useDispatch, useSelector} from "react-redux";
import {getResponseError} from "util/api_util";
import {Link} from "react-router-dom";
import {renderFormError} from "components/forms/FormErrorRenderer.js";

function ChangePasswordForm() {

    const [firstPassword, setFirstPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const status = useSelector(state => state.auth.status);
    const errors = useSelector(state => state.auth.errors);
    const dispatch = useDispatch();

    const onFirstPasswordChange = useCallback(e => onFieldChange(setFirstPassword, e), []);

    const onSecondPasswordChange = useCallback(e => onFieldChange(setSecondPassword, e), []);

    const attemptLogin = useCallback(e => {
        e.preventDefault();
        dispatch(tryChangePassword(firstPassword, secondPassword));
    }, [firstPassword, secondPassword]);

    const renderButtonContent = useCallback(() => {
        if (status !== 'SENT_CHANGE_PASSWORD_REQUEST') {
            return "Change password 🔑";
        }
        else {
            return <Spinner visible={true}/>;
        }
    }, [status]);

    let formError = getResponseError(errors, 'non_field_errors');

    return <div className={'forgotPasswordComponent'}>
        <form onSubmit={attemptLogin} className={'form'} autoComplete="none">
            <Text className={"formTitle"} text={"Choose a new password"} />
            <Text className={"formDescription"} text={"Enter new password and confirm"} />

            <InputWithError errors={errors} name="Password" id={'password1'} type={'password'}
                            onChange={onFirstPasswordChange}
                            placeholder={"Type in new password"} autoComplete="on"/>

            <InputWithError errors={errors} name="Confirm Password" id={'password2'} type={'password'}
                            onChange={onSecondPasswordChange}
                            placeholder={""} autoComplete="on"/>

            {renderFormError(formError)}

            <div className={"buttonGroup"}>
                <Button>{renderButtonContent()}</Button>
            </div>

            <div className={"needAccount"}>
                <Text text={"Wrong page?"}/>
                <Link to={'/'} className={"registerLink"}>Sign in</Link>
            </div>
        </form>
    </div>;
}

export default ChangePasswordForm;