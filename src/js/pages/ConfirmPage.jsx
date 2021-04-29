import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect, useLocation} from "react-router-dom";
import {selectorAccountConfirm, tryConfirmAccount} from "redux/reducers/api/account";

import Text from "components/Text.jsx";

import "styles/pages/ConfirmPage.scss";

function ConfirmPage(props) {

    const dispatch = useDispatch();
    const confirmationState = useSelector(selectorAccountConfirm);
    const status = confirmationState.status;
    const location = useLocation();
    const [error, setError] = useState(false);

    useEffect(() => dispatch(tryConfirmAccount(props.match.params.token)), []);

    useEffect(() => {
        console.log(status);
        if (status === 'CONFIRMATION_ERROR') {
            setError(true);
        }
        else if (status === 'CONFIRMATION_TOKEN_SENT') {
            setError(false)
        }
        else if (status === 'ACCOUNT_CONFIRMED') {
            setError(false);
        }
    }, [status])

    if (error) {
        return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
    }

    return <div className={"confirmPage"}>
        <div className={"accountConfirmationPopup"}>
            <div className={'imageWrapper'}>
                <img className={"emailSentIcon"} src={'images/sent_mail_icon.png'} width={60} height={60} alt={""}/>
            </div>
            <div className={"confirmationMessage"}>
                <Text className={"title"}>Your account has been confirmed and activated.</Text>
                <Text className={"message"}>You can now sign in.</Text>
            </div>;
            <div className={"buttonGroup"}>
                <Link to={'/login'} className={'button'}>Back to sign in</Link>
            </div>
        </div>
    </div>;
}

export default ConfirmPage;