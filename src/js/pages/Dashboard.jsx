import React from "react";

import {tryGetHello} from "../redux/reducers/api/helloSlice.js"
import Button from "components/Button";

import "styles/pages/Dashboard.scss"
import {useDispatch} from "react-redux";

export default () => {

    const dispatch = useDispatch()

    const getHello = useCallback(() => {
        dispatch(tryGetHello())
    }, []);

    return <div className={"dashboard"}>
        <div className={"username"}>Dashboard for user</div>
        <div className={"username"}>Dashboard for user</div>
        <Button className={"button"} onClick={getHello} text={"Get Hello"}/>
    </div>
}