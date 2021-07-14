import LoginForm from "components/forms/LoginForm.jsx";
import React from 'react';

import "styles/pages/LoginPage.scss";

const LoginPage = () => {

    return <div className={"loginPage"}>
        <div className={"wrapper"}>
            <LoginForm/>
        </div>
    </div>;
};

export default LoginPage;