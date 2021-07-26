import {Text} from "kuchkr-react-component-library";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {getResponseError} from "util/api_util.js";
import _ from 'lodash';

const errorTextTheme = {
    textColor: "#ff4949",
    fontSize: "15px"
};

export const renderFormError = (errors) => {
    /**
     * Get generic application errors
     */
    let genericErrors = getResponseError(errors, 'generic');

    /**
     * Get non-field errors for form
     */
    let formError = getResponseError(errors, 'form', 'non_field_errors');

    /**
     * Filter generic errors by source - not displaying autologin errors
     */
    genericErrors = _.filter(genericErrors, error => error.source !== 'autoLogin');

    /**
     * Merge generic application errors with non-field form errors
     */
    const targetErrors = [...genericErrors, ...formError];

    /**
     * Render each error in row
     */
    let rows = [];
    for (let i = 0; i < targetErrors.length; i++) {
        console.log(`Target error [${i}] = ${targetErrors[i]}`);
        rows.push(<div key={i} className={"errorWrapper"}>
            <FontAwesomeIcon className={"errorIcon"} icon={faExclamationCircle}/>
            <Text style={{marginLeft: 5}} theme={errorTextTheme} text={targetErrors[i]['message']}/>
        </div>);
    }
    return <>{rows}</>;
};