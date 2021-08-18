import {tryLogout} from "appRedux/reducers/api/account";
import {logoutButtonTheme} from "components/LogoutButton/style.js";
import {Button} from "kuchkr-react-component-library";
import React, {useCallback} from "react";
import {useDispatch} from "react-redux";

const LogoutButton = props => {

    const {theme} = props;

    const dispatch = useDispatch();

    const logout = useCallback(() => dispatch(tryLogout()), []);

    return <Button theme={theme ? theme : logoutButtonTheme} text={"Sign out"} onClick={logout}/>;
};

export default LogoutButton;