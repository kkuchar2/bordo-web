import React, {useEffect, useState} from "react";
import {selectorAuth, tryLoginWithAuthKey} from "redux/reducers/api/account";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, useLocation} from "react-router-dom";
import {getCookie} from "util/CookieManager.js";
import WaitingComponent from "components/WaitingComponent.jsx";
import {isOnLoginPage} from "routes/routes.js";

export const SimpleRoute = ({component: Component, ...rest}) => {

    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const location = useLocation();
    const authState = useSelector(selectorAuth);
    const dispatch = useDispatch();
    const tokenExists = getCookie('token') !== undefined;

    const [receivedAuthResponse, setReceiveAuthResponse] = useState(false);

    console.log(authState);

    useEffect(() => {
        if (tokenExists && !authState.isUserLoggedIn) {
            dispatch(tryLoginWithAuthKey());
            setLoading(true);
        }
    }, []);

    useEffect(() => {
        if (authState.errors === 'Unauthorized') {
            setLoading(false);
            setLoggedIn(false);
            setReceiveAuthResponse(true);
            return;
        }

        if (authState.isUserLoggedIn) {
            setLoading(false);
            setReceiveAuthResponse(true);
            setLoggedIn(authState.isUserLoggedIn);
        }
    }, [authState]);

    console.log('Loading: ' + loading + ' loggedIn: ' + loggedIn + ' received auth response: ' + receivedAuthResponse + ' isOnLoginPage: ' + isOnLoginPage());

    return <Route
        {...rest}
        render={props => {
            if (!tokenExists) {
                return <Component {...props} />;
            }
            if (!loading && !receivedAuthResponse) {
                return <></>;
            }
            if (loading && !receivedAuthResponse) {
                return <WaitingComponent {...props} />;
            }
            else if (!loading && receivedAuthResponse && loggedIn && isOnLoginPage()) {
                return <Redirect to={{ pathname: "/dashboard", state: { from: location } }} />;
            }
            else {
                return <Component {...props} />;
            }
        }}
    />;
};