import React from 'react';

import RegistrationForm from "components/RegistrationForm.jsx";

import {useSelector, useDispatch} from "react-redux";
import EmailSentPopup from "components/EmailSentPopup.jsx";

import "styles/pages/RegistrationPage.scss"

export default () => {

    const status = useSelector(state => state.registration.status);

    console.log('Registration status: ' + status)

    const renderEmailSent = () => {
        if (status === "REGISTRATION_COMPLETE") {
            return <EmailSentPopup />
        }
    }

    const renderRegistrationForm = () => {
        if (status !== "REGISTRATION_COMPLETE") {
            return <RegistrationForm />
        }
    }

    return <div className={"registrationPage"}>
        {renderEmailSent()}
        {renderRegistrationForm()}
    </div>;
}