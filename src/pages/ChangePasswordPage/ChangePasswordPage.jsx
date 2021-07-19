import React from 'react';
import ChangePasswordForm from "components/FormComponents/ChangePasswordForm/ChangePasswordForm.jsx";
import {StyledChangePasswordPage} from "pages/ChangePasswordPage/style.js";

const ChangePasswordPage = (props) => {
    return <StyledChangePasswordPage>s
        <ChangePasswordForm token={props.match.params.token}/>
    </StyledChangePasswordPage>;
};

export default ChangePasswordPage;