import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectorAccountConfirm, tryConfirmAccount} from "../redux/reducers/api/account";

import "styles/pages/ConfirmPage.scss"

export default props => {

    const dispatch = useDispatch();
    const confirmationState = useSelector(selectorAccountConfirm);

    const state = confirmationState.state;

    useEffect(() => dispatch(tryConfirmAccount(props.match.params.token)), [])

    const renderConfirmationMessage = useCallback(() => {
        if (state === "CONFIRMATION_ERROR") {
            return <div className={"confirmationMessage"}>Error while confirming account</div>
        }
        else {
            return <div className={"confirmationMessage"}>Account has been confirmed</div>
        }
    }, [state])

    return <div className={"confirmPage"}>
        {renderConfirmationMessage()}
        <Link to={'/login'} className={'button'}>Back to sign in</Link>
    </div>;
}