import React, {useCallback, useEffect} from 'react';

import {selectorForgotPassword, tryResetState} from "appRedux/reducers/api/account";
import EmailSentPopup from "components/EmailSentPopup/EmailSentPopup";
import ForgotPasswordForm from "components/FormComponents/ForgotPassword/ForgotPasswordForm";
import {useDispatch, useSelector} from "react-redux";

import {StyledForgotPasswordPage} from "./style";

const ForgotPasswordPage = () => {

    const forgotPasswordState = useSelector(selectorForgotPassword);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tryResetState());
    }, []);

    const renderForgotPasswordForm = useCallback(() => <ForgotPasswordForm/>, []);

    const renderEmailSentPopup = useCallback(() => {
        return <EmailSentPopup
                resetFunc={tryResetState}
                title={"Password Reset Email Sent"}
                message={"An email has been sent to your email address. Follow the directions in the email to reset your password"}/>;
    }, []);

    return <StyledForgotPasswordPage>
        {renderForgotPasswordForm()}
    </StyledForgotPasswordPage>;
};

export default ForgotPasswordPage;