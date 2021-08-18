import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {hasCookie, setCookie} from "util/CookieManager.js";
import {showDialog} from "appRedux/reducers/application";

function AppManager() {

    const dispatch = useDispatch();

    useEffect(() => displayCookiesConfirmationDialog(), []);

    const displayCookiesConfirmationDialog = () => {
        if (hasCookie("cookieAccepted")) {
            return;
        }

        dispatch(showDialog({
            title: "Cookie consent",
            description: "This website uses cookies to enhance user experience",
            onConfirm: () => setCookie("cookieAccepted", true),
            onCancel: () => setCookie("cookieAccepted", false)
        }));
    };

    return <></>;
}

export default AppManager;