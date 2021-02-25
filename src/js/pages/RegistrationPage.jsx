import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withNotStatus, withStatus} from "util/util";
import EmailSentPopup from "components/EmailSentPopup";
import RegistrationForm from "components/RegistrationForm";
import {reset, selectorRegistration} from "../redux/reducers/api/account";

import "styles/pages/RegistrationPage.scss";

function RegistrationPage() {

    const registrationState = useSelector(selectorRegistration);
    const status = registrationState.status;
    const dispatch = useDispatch();

    useEffect(() => dispatch(reset()), []);

    const renderRegistrationFormGroup = useCallback(() => {
        return <div className={'registrationFormGroup'}>
            <div className={"registrationWrapper"}>
                <RegistrationForm/>
            </div>
        </div>;
    }, []);

    return <div className={"registrationPage"}>
        {withStatus(status, "REGISTRATION_COMPLETE", () => <EmailSentPopup/>)}
        {withNotStatus(status, "REGISTRATION_COMPLETE", renderRegistrationFormGroup)}
    </div>;
}

export default RegistrationPage;