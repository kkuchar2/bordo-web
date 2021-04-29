import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import Text from "components/Text";

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
            <Text className={"errorText"} text={err[i]['message']}/>
        </div>);
    }
    return <>{rows}</>;
};