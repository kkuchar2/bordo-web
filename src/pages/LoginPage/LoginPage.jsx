import LoginForm from "components/FormComponents/LoginForm/LoginForm.jsx";
import EnsureAuthorized from "hoc/EnsureAuthorized.jsx";
import {StyledLoginPage} from "pages/LoginPage/style.js";
import React from 'react';

const LoginPage = () => {

    return <StyledLoginPage>
        <div className={"wrapper"}>
            <LoginForm/>
        </div>
    </StyledLoginPage>;
};

export default EnsureAuthorized(LoginPage);