import React from 'react';

import {defaultShowUpAnimation} from "components/FormComponents/animation";
import LoginForm from "components/FormComponents/LoginForm/LoginForm";
import {EnsureAuthorized} from "hoc/EnsureAuthorized";
import {Text} from "kuchkr-react-component-library";

import {StyledTitles, AnimatedText, descriptionTheme, StyledLoginPage, titleTheme} from "./style";

const LoginPage = () => {
    return <StyledLoginPage>
        <StyledTitles>
            <AnimatedText {...defaultShowUpAnimation}>
                <Text theme={titleTheme} text={"REACT DJANGO ADMINISTRATION"}/>
            </AnimatedText>

            <AnimatedText {...defaultShowUpAnimation}>
                <Text theme={descriptionTheme}
                      text={"Very much cool website for managing my Django models from React static application"}/>
            </AnimatedText>
        </StyledTitles>

        <LoginForm/>
    </StyledLoginPage>;
};

export default EnsureAuthorized(LoginPage) as React.FC;