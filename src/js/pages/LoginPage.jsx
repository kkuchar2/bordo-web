import React from 'react';
import LoginForm from "components/LoginForm";

import "styles/pages/LoginPage.scss";

export default () => {

    return (<div className={"loginPage"}>
        <div className={"loginWrapper"}>
            <LoginForm/>
        </div>
    </div>);
}