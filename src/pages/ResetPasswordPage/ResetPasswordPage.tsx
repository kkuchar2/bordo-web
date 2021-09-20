import React from 'react';

import ResetPasswordForm from "components/FormComponents/ResetPasswordForm/ResetPasswordForm";
import {RouteComponentProps} from 'react-router';

import {StyledResetPasswordPage} from "./style";

interface MatchParams {
    token: string;
}

const ResetPasswordPage = (props: RouteComponentProps<MatchParams>) => {
    return <StyledResetPasswordPage>s
        <ResetPasswordForm token={props.match.params.token}/>
    </StyledResetPasswordPage>;
};

export default ResetPasswordPage;