import {StyledEmailSent, StyledLink, textThemeDescription, textThemeTitle} from "components/EmailSentPopup/style.js";
import {animatedWindowProps} from "components/FormComponents/animation.js";
import {Text} from "kuchkr-react-component-library";
import React from "react";
import {useDispatch} from "react-redux";

const EmailSentPopup = (props) => {

    const {title, message, resetFunc} = props;

    const dispatch = useDispatch();

    const onLoginClick = () => dispatch(resetFunc());

    return <StyledEmailSent {...animatedWindowProps}>
        <div className={'popup'}>
            <div className={'imageWrapper'}>
                <img className={"emailSentIcon"} src={'images/sent_mail_icon.png'} width={60} height={60} alt={""}/>
            </div>
            <Text style={{marginTop: 20, textAlign: 'center'}} theme={textThemeTitle} text={title}/>
            <Text style={{marginTop: 20, marginBottom: 20, textAlign: 'center'}} theme={textThemeDescription} text={message}/>
            <div className={"buttonGroup"}>
                <StyledLink onClick={onLoginClick} to={'/'}>Back to sign in</StyledLink>
            </div>
        </div>
    </StyledEmailSent>;
};

export default EmailSentPopup;
