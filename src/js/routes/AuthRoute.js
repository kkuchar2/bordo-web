import {selectorAuth, tryLoginWithAuthKey, tryValidateAuthentication} from "../redux/reducers/api/account";
import React, {useEffect, useState} from "react";
import {Redirect, Route, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import WaitingComponent from "components/WaitingComponent.jsx";
import {getCookie} from "util/CookieManager.js";
import {isOnAuthShadowedPage} from "routes/routes.js";

/**
 * TODO: DO NOT USE authLogic -> just sent validation request in AuthRoute it will be simpler
 */

export const AuthRoute = ({component: Component, ...rest}) => {

    const [loading, setLoading] = useState(false);
    const [receivedAuthResponse, setReceiveAuthResponse] = useState(false);

    const authState = useSelector(selectorAuth);
    const location = useLocation();
    const dispatch = useDispatch();
    const tokenExists = getCookie('token') !== undefined;

    useEffect(() => {
        if (tokenExists && !authState.isUserLoggedIn) {
            console.log("Logging in with token");
            dispatch(tryLoginWithAuthKey());
        }
        else if (tokenExists && authState.isUserLoggedIn) {
            dispatch(tryValidateAuthentication());
        }
    }, []);

    useEffect(() => {
        console.log("Current auth changed: " + JSON.stringify(authState));

        if (authState.status === 'LOGGED_IN') {
            dispatch(tryValidateAuthentication());
            return;
        }
        else if (authState.status === 'AUTHENTICATED') {
            setLoading(false);
            setReceiveAuthResponse(true);
        }

        if (authState.hasPermission && authState.isUserLoggedIn) {
            setLoading(false);
        }
        else {
            setLoading(true);
        }
    }, [authState]);

    return (
        <Route
            {...rest}
            render={props => {
                if (!tokenExists) {
                    return <Redirect to={{pathname: "/", state: {from: location}}}/>;
                }
                if (loading || !receivedAuthResponse) {
                    return <WaitingComponent {...props} />;
                }
                if (authState.isUserLoggedIn) {
                    return <Component {...props} />;
                }
                return <Redirect to={{pathname: "/", state: {from: location}}}/>;
            }}
        />
    );
};