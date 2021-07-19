import {animatedWindowProps} from "components/FormComponents/animation.js";
import WaitingComponent from "components/WaitingComponent/WaitingComponent.jsx";
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect, useLocation} from "react-router-dom";
import {selectorAccountConfirm, tryConfirmAccount} from "appRedux/reducers/api/account";
import {Text} from "kuchkr-react-component-library";
import {StyledConfirmPage, StyledConfirmPopup} from "pages/ConfirmPage/style.js";

const ConfirmPage = (props) => {

    const dispatch = useDispatch();
    const confirmationState = useSelector(selectorAccountConfirm);
    const status = confirmationState.status;
    const location = useLocation();
    const [error, setError] = useState(false);

    useEffect(() => dispatch(tryConfirmAccount(props.match.params.token)), []);

    useEffect(() => {
        if (status === 'CONFIRMATION_ERROR') {
            setError(true);
        }
        else if (status === 'CONFIRMATION_TOKEN_SENT') {
            setError(false);
        }
        else if (status === 'ACCOUNT_CONFIRMED') {
            setError(false);
        }
    }, [status]);

    if (error) {
        return <Redirect to={{ pathname: "/", state: { from: location } }} />;
    }

    if (status === 'CONFIRMATION_TOKEN_SENT')
    {
        return <WaitingComponent />;
    }

    return <StyledConfirmPage>
        <StyledConfirmPopup {...animatedWindowProps}>
            <div className={'imageWrapper'}>
                <img className={"emailSentIcon"} src={'images/sent_mail_icon.png'} width={60} height={60} alt={""}/>
            </div>
            <div className={"confirmationMessage"}>
                <Text theme={Text.darkTheme} text={"Your account has been confirmed and activated."} />
                <Text theme={Text.darkTheme} text={"You can now sign in"} />
            </div>
            <div className={"buttonGroup"}>
                <Link to={'/'} className={'button'}>Back to sign in</Link>
            </div>
        </StyledConfirmPopup>
    </StyledConfirmPage>;
};

export default ConfirmPage;