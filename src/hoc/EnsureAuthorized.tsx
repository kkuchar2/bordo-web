import React, {ComponentType, useCallback, useEffect, useState} from "react";

import {isFailure, isWaiting, isSuccess} from "api/api_util";
import {getAutoLoginState, getUserState} from "appRedux/reducers/api/user/userSlice";
import {autoLogin} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {isOnAuthenticatedPage} from "routes";

export const EnsureAuthorized = (WrappedComponent: ComponentType) => {
    const wrappedComponent = (props: any) => {

        const [sentAutologinRequest, setSentAutologinRequest] = useState(false);

        const location = useLocation();
        const isOnAuthPage = isOnAuthenticatedPage();

        const userState = useSelector(getUserState);
        const autoLoginState = useSelector(getAutoLoginState);

        const requestPending = isWaiting(autoLoginState);
        const requestSuccess = isSuccess(autoLoginState);
        const requestFailure = isFailure(autoLoginState);

        const receivedResponse = !requestPending && (requestSuccess || requestFailure);

        const loggedIn = userState.loggedIn;

        const dispatch = useAppDispatch();

        /**
         * Component will autologin only when user is not logged in, so most
         * of the time, when user refreshes the page (or opens page in another window)
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
                dispatch(autoLogin());
            }
        }, [sentAutologinRequest]);

        const redirect = useCallback((path) => <Navigate to={path}/>, [location]);

        const renderWhenLoggedInAndOnPublicPage = useCallback(() => {
            //console.log('Rendering when logged in and on auth page');

            if (!requestPending && receivedResponse) {
                return redirect("/home");
            }
            return null;
        }, [requestPending, receivedResponse]);

        const renderWhenLoggedOutAndOnPublicPage = useCallback(() => {
            //console.log('Rendering when logged out and on public page');

            if (requestPending) {
                return <WrappedComponent {...props} />;
            }
            else {
                if (!requestPending && !receivedResponse) {
                    return null;
                }
                else if ((requestPending && !receivedResponse) || (!requestPending && receivedResponse)) {
                    return <WrappedComponent {...props} />;
                }
            }

            return <></>;
        }, [requestPending, receivedResponse]);

        const renderWhenLoggedInAndOnAuthPage = useCallback(() => {
            //console.log('Rendering when logged in and on auth page');

            if ((!requestPending && receivedResponse) || (requestPending && !receivedResponse)) {
                return <WrappedComponent {...props} />;
            }
            else {
                return <></>;
            }
        }, [requestPending, receivedResponse]);

        const renderWhenLoggedOutAndOnAuthPage = useCallback(() => {
            // console.log('Rendering when logged out and on auth page');

            if (!requestPending && receivedResponse) {
                return redirect("/");
            }
            else if ((!requestPending && !receivedResponse) || (requestPending && !receivedResponse)) {
                return <></>;
            }
        }, [requestPending, receivedResponse]);
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
            if (loggedIn) {
                return renderWhenLoggedInAndOnAuthPage();
            }
            return renderWhenLoggedOutAndOnAuthPage();
        }
        else {
            if (loggedIn) {
                return renderWhenLoggedInAndOnPublicPage();
            }
            return renderWhenLoggedOutAndOnPublicPage();
        }
    };

    wrappedComponent.displayName = 'wrapped_ensure_authorized';

    return wrappedComponent;
};