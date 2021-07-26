import React from 'react';
import ResetPasswordForm from "components/FormComponents/ResetPasswordForm/ResetPasswordForm.jsx";
import {StyledResetPasswordPage} from "pages/ResetPasswordPage/style.js";

const ResetPasswordPage = (props) => {
    return <StyledResetPasswordPage>s
        <ResetPasswordForm token={props.match.params.token}/>
    </StyledResetPasswordPage>;
};

export default ResetPasswordPage;