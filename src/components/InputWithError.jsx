import {Input, Text} from "kuchkr-react-component-library";
import React, {useState, useCallback, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {getResponseError} from "util/api_util.js";

const formFieldTheme = {
    backgroundColor: "#2b2b2b",
    textColor: "#cbcbcb",
    disabledTextColor: "red",
    placeholderTextColor: "#4c4c4c",
    border: "none",
    borderRadius: "4px"
};

const errorTextTheme = {
    textColor: "#ff4949",
    fontSize: "15px"
};

const InputWithError = (props) => {

    const [error, setError] = useState(undefined);

    useEffect(() => setError(getResponseError(props.errors, props.id)), [props.id, props.errors]);

    const renderError = useCallback(() => {
        if (error === undefined || error === null) {
            return;
        }
        if (error.length === 0) {
            return;
        }

        let rows = [];
        for (let i = 0; i < error.length; i++) {
            rows.push(<div key={i} className={"errorWrapper"}>
                <FontAwesomeIcon className={"errorIcon"} icon={faExclamationCircle}/>
                <Text style={{marginLeft: 5}} theme={errorTextTheme} text={error[i]['message']}/>
            </div>);
        }
        return <>{rows}</>;
    }, [error]);

    const onChange = useCallback(props.onChange, []);

    return <>
        <Input
            name={props.id}
            style={{marginTop: 10, padding: 3}}
            theme={formFieldTheme}
            id={props.id}
            type={props.type}
            onChange={onChange}
            autoComplete={"on"}
            disabled={props.disabled}
            placeholder={props.placeholder}/>
        {renderError()}
    </>;
};

export default InputWithError;