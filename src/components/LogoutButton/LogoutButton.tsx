import React, {useCallback} from "react";

import {logout} from "appRedux/services/userService";
import {useAppDispatch} from "appRedux/store";
import {Button} from "kuchkr-react-component-library";
import {Dictionary} from "kuchkr-react-component-library/build/util/BaseTypes.types";

import {logoutButtonTheme} from "./style";

export interface LogoutButtonProps {
    theme: Dictionary<any>
}

const LogoutButton = (props: LogoutButtonProps) => {

    const {theme} = props;

    const dispatch = useAppDispatch();

    const performLogout = useCallback(() => dispatch(logout()), []);

    return <Button theme={theme ? theme : logoutButtonTheme} text={"Sign out"} onClick={performLogout}/>;
};

export default LogoutButton;