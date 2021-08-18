import {selectorAuth, tryAutoLogin} from "appRedux/reducers/api/account";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import {isOnAuthenticatedPage} from "routes.js";

const EnsureAuthorized = (WrappedComponent) => {

    function wrapped(props) {

        const [sentAutologinRequest, setSentAutologinRequest] = useState(false);

        const location = useLocation();
        const authState = useSelector(selectorAuth);
        const dispatch = useDispatch();
        const isOnAuthPage = isOnAuthenticatedPage();
        const receivedResponse = authState.responseReceived;
        const requestSent = authState.requestSent;
        const loggedIn = authState.loggedIn;

        /**
         * Component will autologin only when user is not logged in, so most
         * of the time, when user refreshes the page (or opens page in antoher window)
         *
         * This prevents also sending autologin request, when user logged in already with password
         */
        useEffect(() => {
            if (!loggedIn) {
                setSentAutologinRequest(true);
            }
        }, []);

        useEffect(() => {
            if (sentAutologinRequest) {
                dispatch(tryAutoLogin());
            }
        }, [sentAutologinRequest]);

        const redirect = useCallback((path) => <Redirect to={{pathname: path, state: {from: location}}}/>, [location]);

        /**
         * Processing pages with authentication splits in 2 cases:
         * 1. isOnAuthPage -> user opened page, that requires being logged in
         * 2. !isOnAuthPage -> user opened public page
         *
         * When user is authenticated public pages redirect to /dashboard
         * When user is unauthenticated auth pages redirect to /
         * When authentication is in progress - empty component is rendered
         */

        if (isOnAuthPage) {
            if (loggedIn)
            {
                if ((!requestSent && receivedResponse) || (requestSent && !receivedResponse)) {
                    return <WrappedComponent {...props} />;
                }
                else {
                    return <></>;
                }
            }
            else {
                if (!requestSent && receivedResponse) {
                    return redirect("/");
                }
                else if ((!requestSent && !receivedResponse) || (requestSent && !receivedResponse)) {
                    return <></>;
                }
            }
        }
        else {
            if (loggedIn)
            {
                if (!requestSent && receivedResponse) {
                    return redirect("/home");
                }
                else {
                    return <></>;
                }
            }
            else {
                if (!requestSent && !receivedResponse) {
                    return <></>;
                }
                else if ((requestSent && !receivedResponse) || (!requestSent && receivedResponse)) {
                    return <WrappedComponent {...props} />;
                }
            }
        }
    }

    return wrapped;
};

export default EnsureAuthorized;
