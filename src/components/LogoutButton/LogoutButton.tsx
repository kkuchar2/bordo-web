import React, {useCallback} from "react";

import {tryLogout} from "appRedux/reducers/api/account";
import {Button} from "kuchkr-react-component-library";
import {Dictionary} from "kuchkr-react-component-library/build/util/BaseTypes.types";
import {useDispatch} from "react-redux";

import {logoutButtonTheme} from "./style";

export interface LogoutButtonProps {
    theme: Dictionary<any>
}

const LogoutButton = (props: LogoutButtonProps) => {

    const {theme} = props;

    const dispatch = useDispatch();

    const logout = useCallback(() => dispatch(tryLogout()), []);

    return <Button theme={theme ? theme : logoutButtonTheme} text={"Sign out"} onClick={logout}/>;
};

export default LogoutButton;