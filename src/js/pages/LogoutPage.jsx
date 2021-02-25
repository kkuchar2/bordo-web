import React, {useEffect} from 'react';

import "styles/pages/LogoutPage.scss";
import {useDispatch} from "react-redux";
import {tryLogout} from "../redux/reducers/api/account";

export default () => {

    const dispatch = useDispatch();

    useEffect(() => dispatch(tryLogout()), []);

    return <div/>
}