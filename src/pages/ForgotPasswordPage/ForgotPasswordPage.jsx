import EmailSentPopup from "components/EmailSentPopup/EmailSentPopup.jsx";
import ForgotPasswordForm from "components/FormComponents/ForgotPassword/ForgotPasswordForm.jsx";
import {StyledForgotPasswordPage} from "pages/ForgotPasswordPage/style.js";
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectorForgotPassword, tryResetForgotPasswordState} from "appRedux/reducers/api/account";
import {withNotStatus, withStatus} from "util/util.js";

const ForgotPasswordPage = () => {

    const forgotPasswordState = useSelector(selectorForgotPassword);
    const status = forgotPasswordState.status;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tryResetForgotPasswordState());
    }, []);

    const renderForgotPasswordForm = useCallback(() => {
        return <div className={"wrapperForgotPassword"}>
            <ForgotPasswordForm/>
        </div>;
    }, []);

    const renderEmailSentPopup = useCallback(() => {
        return <div className={"wrapperEmailSent"}>
            <EmailSentPopup
                resetFunc={tryResetForgotPasswordState}
                title={"Password Reset Email Sent"}
                message={"An email has been sent to your email address. Follow the directions in the email to reset your password"}/>
        </div>;
    }, []);

    return <StyledForgotPasswordPage>
        {withStatus(status, "FORGOT_PASSWORD_EMAIL_SENT", renderEmailSentPopup)}
        {withNotStatus(status, "FORGOT_PASSWORD_EMAIL_SENT", renderForgotPasswordForm)}
    </StyledForgotPasswordPage>;
};

export default ForgotPasswordPage;