import React, {ComponentType, useCallback, useEffect, useState} from "react";

import {selectorAuth, tryAutoLogin} from "appRedux/reducers/api/account";
import {useAppDispatch} from "appRedux/store";
import {RequestStatus} from "axios-client-wrapper";
import {useSelector} from "react-redux";
import {Redirect, useLocation} from "react-router-dom";
import {isOnAuthenticatedPage} from "routes";

export const EnsureAuthorized = (WrappedComponent: ComponentType) => {
    const wrappedComponent = (props: any) => {

        const [sentAutologinRequest, setSentAutologinRequest] = useState(false);

        const location = useLocation();
        const authState = useSelector(selectorAuth);
        const isOnAuthPage = isOnAuthenticatedPage();

        const requestPath = authState.path;
        const requestStatus = authState.requestState.status;
        const requestPending = authState.requestState.pending;

        const receivedResponse = !requestPending && (requestStatus === RequestStatus.Success || requestStatus === RequestStatus.Failure);

        const loggedIn = authState.user ? authState.user.loggedIn : false;

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
                dispatch(tryAutoLogin());
            }
        }, [sentAutologinRequest]);

        const redirect = useCallback((path) => <Redirect to={{pathname: path, state: {from: location}}}/>, [location]);

        const renderWhenLoggedInAndOnPublicPage = useCallback(() => {
            if (!requestPending && receivedResponse) {
                return redirect("/home");
            }
            return null;
        }, [requestPending, receivedResponse]);

        const renderWhenLoggedOutAndOnPublicPage = useCallback(() => {
            if (requestPath === 'autoLogin' && requestPending) {
                return <WrappedComponent {...props} />;
            } else {
                if (!requestPending && !receivedResponse) {
                    return null;
                } else if ((requestPending && !receivedResponse) || (!requestPending && receivedResponse)) {
                    return <WrappedComponent {...props} />;
                }
            }

            return <></>;
        }, [requestPath, requestPending, receivedResponse]);

        const renderWhenLoggedInAndOnAuthPage = useCallback(() => {
            if ((!requestPending && receivedResponse) || (requestPending && !receivedResponse)) {
                return <WrappedComponent {...props} />;
            } else {
                return <></>;
            }
        }, [requestPending, receivedResponse]);

        const renderWhenLoggedOutAndOnAuthPage = useCallback(() => {
            if (!requestPending && receivedResponse) {
                return redirect("/");
            } else if ((!requestPending && !receivedResponse) || (requestPending && !receivedResponse)) {
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
        } else {
            if (loggedIn) {
                return renderWhenLoggedInAndOnPublicPage();
            }
            return renderWhenLoggedOutAndOnPublicPage();
        }
    };

    wrappedComponent.displayName = 'wrapped_ensure_authorized';

    return wrappedComponent;
};