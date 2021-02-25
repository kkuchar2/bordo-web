import {selectorAuth} from "../redux/reducers/api/account";
import React from "react";
import {Redirect, Route, useLocation} from "react-router-dom"
import {useSelector} from "react-redux";

export const AuthRoute = ({component: Component, ...rest}) => {
    const authState = useSelector(selectorAuth)

    const location = useLocation()

    console.log("AuthRoute(loggedIn=" + authState.isUserLoggedIn + ")")
    return (
        <Route
            {...rest}
            render={props => {
                if (authState.isUserLoggedIn) {
                    console.log("AuthRoute -> user is authenticated, Redirecting to: " + location);
                    return <Component {...props} />
                }
                else {
                    console.log("AuthRoute -> user is logged out, redirecting to main page")
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: location,
                                },
                            }}
                        />
                    )
                }
            }}
        />
    )
}