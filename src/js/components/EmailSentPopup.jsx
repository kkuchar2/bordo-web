import {Text} from "kuchkr-react-component-library";
import React from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {reset} from "redux/reducers/api/account";

import "componentStyles/EmailSentPopup.scss";

function EmailSentPopup() {

    const dispatch = useDispatch();

    const onLoginClick = () => dispatch(reset());

    return <div className={'emailSentPopup'}>
        <div className={'popup'}>
            <div className={'imageWrapper'}>
                <img className={"emailSentIcon"} src={'images/sent_mail_icon.png'} width={60} height={60} alt={""}/>
            </div>
            <Text text={"Registration successful!"} />
            <Text text={"We've sent you a link to confirm your email address. Please check your inbox."} />
            <div className={"buttonGroup"}>
                <Link onClick={onLoginClick} to={'/'} className={'button'}>Back to sign in</Link>
            </div>
        </div>
    </div>;
}

export default EmailSentPopup;
