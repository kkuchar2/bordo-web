import ConfirmationDialog from "components/Dialogs/ConfirmationDialog/ConfirmationDialog.jsx";
import CreateNewModelItemDialog from "components/Dialogs/CreateNewModelItemDialog/CreateNewModelItemDialog.jsx";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {showDialog} from "appRedux/reducers/application";

function AppManager() {

    const dispatch = useDispatch();

    useEffect(() => displayCookiesConfirmationDialog(), []);

    const displayCookiesConfirmationDialog = () => {
        // if (hasCookie("cookieAccepted")) {
        //     return;
        // }

    };

    return <></>;
}

export default AppManager;