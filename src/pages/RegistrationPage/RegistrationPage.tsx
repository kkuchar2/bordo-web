import React, {useCallback, useEffect} from 'react';

import {selectorRegistration, tryResetRegistrationState} from "appRedux/reducers/api/account";
import EmailSentPopup from "components/EmailSentPopup/EmailSentPopup";
import {defaultShowUpAnimation} from "components/FormComponents/animation";
import RegistrationForm from "components/FormComponents/RegistrationForm/RegistrationForm";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {Text} from "kuchkr-react-component-library";
import {useDispatch, useSelector} from "react-redux";

import {AnimatedText, descriptionTheme, StyledTitles, titleTheme} from "../LoginPage/style";

import {StyledRegistrationPage} from "./style";

const RegistrationPage = () => {

    const registrationState = useSelector(selectorRegistration);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tryResetRegistrationState());
    }, []);

    const renderEmailSentPopup = useCallback(() => {
        return <EmailSentPopup
                resetFunc={tryResetRegistrationState}
                title={"Registration successful!"}
                message={"We've sent you a link to confirm your email address. Please check your inbox."}/>;
    }, []);

    return <StyledRegistrationPage>
        <StyledTitles>
            <AnimatedText {...defaultShowUpAnimation}>
                <Text theme={titleTheme} text={"REACT DJANGO ADMINISTRATION"}/>
            </AnimatedText>

            <AnimatedText {...defaultShowUpAnimation}>
                <Text theme={descriptionTheme}
                      text={"Very much cool website for managing my Django models from React static application"}/>
            </AnimatedText>
        </StyledTitles>

        <RegistrationForm />
    </StyledRegistrationPage>;
};

export default EnsureAuthorized(RegistrationPage) as React.FC;