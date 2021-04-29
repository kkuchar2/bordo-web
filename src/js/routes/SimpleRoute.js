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

    useEffect(() => {
        if (tokenExists && !authState.isUserLoggedIn) {
            console.log("Sending auth request");
            dispatch(tryLoginWithAuthKey());
            setLoading(true);
        }
    }, []);

    useEffect(() => {
        console.log(JSON.stringify(authState));

        if (authState.errors === 'Unauthorized') {
            setLoading(false);
            setLoggedIn(false);
            setReceiveAuthResponse(true);
            return;
        }

        if (authState.isUserLoggedIn) {
            console.log("Loading set to false");
            setLoading(false);
            setReceiveAuthResponse(true);
            setLoggedIn(authState.isUserLoggedIn);
        }
    }, [authState]);

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