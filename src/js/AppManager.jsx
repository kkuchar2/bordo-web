import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {hasCookie, setCookie} from "util/CookieManager.js";
import {showDialog} from "redux/reducers/application";
import {useLocation} from "react-router-dom";

function AppManager() {

    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => displayCookiesConfirmationDialog(), []);

    console.log(JSON.stringify(location));

    const displayCookiesConfirmationDialog = () => {
        if (hasCookie("cookieAccepted")) {
            return;
        }

        dispatch(showDialog({
            title: "Cookie consent",
            content: "This website uses cookies to enhance user experience",
            cancelButtonClass: 'buttonBlack',
            confirmButtonClass: 'buttonBlue',
            cancelButtonName: 'Reject',
            confirmButtonName: 'Accept',
            onConfirm: () => setCookie("cookieAccepted", true),
            onCancel: () => setCookie("cookieAccepted", false)
        }));
    };

    return <></>;
}

export default AppManager;