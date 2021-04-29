import React from 'react';
import LoginForm from "components/forms/LoginForm.jsx";

import "styles/pages/LoginPage.scss";

function LoginPage() {

    return (<div className={"loginPage"}>
        <div className={"wrapper"}>
            <LoginForm/>
        </div>
    </div>);
}

export default LoginPage;