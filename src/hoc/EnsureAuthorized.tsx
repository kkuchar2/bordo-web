import React, {ComponentType, useEffect, useMemo} from "react";

import {useMemoRequestState} from "api/api_util";
import {getSelector} from "appRedux/reducers/api/auth/accountSlice";
import {autoLogin} from "appRedux/services/authService";
import {useAppDispatch} from "appRedux/store";
import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import {isOnAuthenticatedPage} from "routes";
import {RequestStatus} from "tools/client/client.types";

export const EnsureAuthorized = (WrappedComponent: ComponentType) => {
    const wrappedComponent = (props: any) => {

        const location = useLocation();

        const isOnAuthPage = isOnAuthenticatedPage();

        const userState = useSelector(getSelector('user'));
        const autoLoginState = useSelector(getSelector('autoLogin'));
        const autologinStateUnknown = useMemoRequestState(autoLoginState, RequestStatus.Unknown);
        const autologinStatePending = useMemoRequestState(autoLoginState, RequestStatus.Waiting);

        const loggedIn = userState.loggedIn;
        const recentlyLoggedOut = userState.recentlyLoggedOut;
        const lastAutologinFailed = userState.lastAutologinFailed;

        const dispatch = useAppDispatch();

        useEffect(() => {
            if (!loggedIn && !recentlyLoggedOut && !lastAutologinFailed) {
                dispatch(autoLogin());
            }
        }, []);

        return useMemo(() => {
            if (autologinStateUnknown || autologinStatePending) {
                return null;
            }

            if (isOnAuthPage) {
                if (loggedIn) {
                    return <WrappedComponent show={true} {...props}/>;
                }
                else {
                    return <Navigate to={'/'} state={{ from: location }}/>;
                }
            }
            else {
                if (loggedIn) {
                    return <Navigate to={'/home'} state={{ from: location }}/>;
                }
                else {
                    return <WrappedComponent show={true} {...props}/>;
                }
            }
        }, [autologinStateUnknown, autologinStatePending, isOnAuthPage, loggedIn, recentlyLoggedOut, location, props]);
    };

    wrappedComponent.displayName = 'wrapped_ensure_authorized';

    return wrappedComponent;
};