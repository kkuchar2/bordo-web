import {Text} from "kuchkr-react-component-library";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";

const errorTextTheme = {
    textColor: "#ff4949",
    fontSize: "15px"
};

export const renderFormError = err => {
    if (err === undefined) {
        return;
    }
    if (err.length === 0) {
        return;
    }

    let rows = [];
    for (let i = 0; i < err.length; i++) {
        rows.push(<div key={i} className={"errorWrapper"}>
            <FontAwesomeIcon className={"errorIcon"} icon={faExclamationCircle}/>
            <Text style={{marginLeft: 5}} theme={errorTextTheme} text={err[i]['message']}/>
        </div>);
    }
    return <>{rows}</>;
};