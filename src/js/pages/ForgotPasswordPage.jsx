import ForgotPasswordForm from "components/forms/ForgotPasswordForm.jsx";
import React from 'react';

import "styles/pages/ForgotPasswordPage.scss";

const ForgotPasswordPage = () => {

    return <div className={"forgotPasswordPage"}>
        <div className={"wrapper"}>
            <ForgotPasswordForm/>
        </div>
    </div>;
};

export default ForgotPasswordPage;