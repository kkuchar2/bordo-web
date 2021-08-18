import {selectorRegistration, tryResetRegistrationState} from "appRedux/reducers/api/account";
import EmailSentPopup from "components/EmailSentPopup/EmailSentPopup.jsx";
import RegistrationForm from "components/FormComponents/RegistrationForm/RegistrationForm.jsx";
import EnsureAuthorized from "hoc/EnsureAuthorized.jsx";
import {StyledRegistrationPage} from "pages/RegistrationPage/style.js";
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withNotStatus, withStatus} from "util/util.js";

const RegistrationPage = () => {

    const registrationState = useSelector(selectorRegistration);
    const status = registrationState.status;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tryResetRegistrationState());
    }, []);

    const renderRegistrationForm = useCallback(() => {
        return <div className={"wrapperSignIn"}>
            <RegistrationForm/>
        </div>;
    }, []);

    const renderEmailSentPopup = useCallback(() => {
        return <div className={"wrapperEmailSent"}>
            <EmailSentPopup
                resetFunc={tryResetRegistrationState}
                title={"Registration successful!"}
                message={"We've sent you a link to confirm your email address. Please check your inbox."}/>
        </div>;
    }, []);

    return <StyledRegistrationPage>
        {withStatus(status, "REGISTRATION_COMPLETE", renderEmailSentPopup)}
        {withNotStatus(status, "REGISTRATION_COMPLETE", renderRegistrationForm)}
    </StyledRegistrationPage>;
};

export default EnsureAuthorized(RegistrationPage);