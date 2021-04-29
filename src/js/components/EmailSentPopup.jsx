import React from "react";
import {useDispatch} from "react-redux";

import Text from "components/Text";
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
            <Text className={'title'}>Registration sucessful!</Text>
            <Text className={'description'}>We've sent you a link to confirm your email address. Please check your
                inbox.</Text>
            <div className={"buttonGroup"}>
                <Link onClick={onLoginClick} to={'/login'} className={'button'}>Back to sign in</Link>
            </div>
        </div>
    </div>;
}

export default EmailSentPopup;
