import React from "react";

import {useAppDispatch} from "appRedux/store";
import {defaultShowUpAnimation} from "components/Forms/animation";
import {StyledLink} from "components/Forms/commonStyles";
import {Text} from "kuchkr-react-component-library";

import {StyledEmailSent, textThemeDescription, textThemeTitle} from "./style";

export interface EmailSentDialogProps {
    title: string,
    message: string,
    resetFunc: Function
}

const EmailSentDialog = (props: EmailSentDialogProps) => {

    const {title, message, resetFunc} = props;

    const dispatch = useAppDispatch();

    const onLoginClick = () => dispatch(resetFunc());

    return <StyledEmailSent {...defaultShowUpAnimation}>
        <div className={'popup'}>
            <div className={'imageWrapper'}>
                <img className={"emailSentIcon"} src={'assets/images/sent_mail_icon.png'} width={60} height={60}
                     alt={""}/>
            </div>
            <Text style={{marginTop: 20, textAlign: 'center'}} theme={textThemeTitle} text={title}/>
            <Text style={{textAlign: 'center'}} theme={textThemeDescription} text={message}/>
            <div className={"buttonGroup"}>
                <StyledLink onClick={onLoginClick} to={'/'}>Back to sign in</StyledLink>
            </div>
        </div>
    </StyledEmailSent>;
};

export default EmailSentDialog;
