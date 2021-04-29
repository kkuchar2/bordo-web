import React from 'react';
import ForgotPasswordForm from "components/forms/ForgotPasswordForm.jsx";

import "styles/pages/ForgotPasswordPage.scss";

function ForgotPasswordPage() {

    return (<div className={"forgotPasswordPage"}>
        <div className={"wrapper"}>
            <ForgotPasswordForm/>
        </div>
    </div>);
}

export default ForgotPasswordPage;