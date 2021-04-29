import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withNotStatus, withStatus} from "util/util";
import EmailSentPopup from "components/EmailSentPopup";
import RegistrationForm from "components/forms/RegistrationForm.jsx";
import {reset, selectorRegistration} from "redux/reducers/api/account";

import "styles/pages/RegistrationPage.scss";

function RegistrationPage() {

    const registrationState = useSelector(selectorRegistration);
    const status = registrationState.status;
    const dispatch = useDispatch();

    useEffect(() => dispatch(reset()), []);

    const renderRegistrationForm = useCallback(() => {
        return <div className={"wrapper"}>
            <RegistrationForm/>
        </div>;
    }, []);

    const renderEmailSentPopup = useCallback(() => {
        return <div className={"wrapper"}>
            <EmailSentPopup/>
        </div>;
    }, []);

    return <div className={"registrationPage"}>
        {withStatus(status, "REGISTRATION_COMPLETE", renderEmailSentPopup)}
        {withNotStatus(status, "REGISTRATION_COMPLETE", renderRegistrationForm)}
    </div>;
}

export default RegistrationPage;