import React from "react";
import {useDispatch} from "react-redux";

import "componentStyles/EmailSentPopup.scss"
import Text from "components/Text.jsx";
import {Link} from "react-router-dom";
import {registrationConstants} from "../redux/constants";

export default () => {

    const dispatch = useDispatch();

    const onLoginClick = () => {
        dispatch({ type: registrationConstants.RESET });
    }

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
    </div>
}