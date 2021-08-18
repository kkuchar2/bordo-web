import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {errorTextTheme, StyledFieldError} from "components/FormComponents/FormErrors/style.js";
import {Text} from "kuchkr-react-component-library";
import React from "react";

export const FieldError = props => {

    const {error} = props;

    return <StyledFieldError {...props}>
        <FontAwesomeIcon className={"icon"} icon={faExclamationCircle}/>
        <Text theme={errorTextTheme} text={error}/>
    </StyledFieldError>;
};