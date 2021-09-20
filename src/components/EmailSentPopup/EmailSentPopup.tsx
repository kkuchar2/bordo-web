import React from "react";

import {StyledEmailSent, textThemeDescription, textThemeTitle} from "components/EmailSentPopup/style";
import {defaultShowUpAnimation} from "components/FormComponents/animation";
import {StyledLink} from "components/FormComponents/commonStyles";
import {Text} from "kuchkr-react-component-library";
import {useDispatch} from "react-redux";

export interface EmailSentPopupProps {
    title: string,
    message: string,
    resetFunc: Function
}

const EmailSentPopup = (props: EmailSentPopupProps) => {

    const {title, message, resetFunc} = props;

    const dispatch = useDispatch();

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

export default EmailSentPopup;
