import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Input, Text} from "kuchkr-react-component-library";
import React, {useCallback, useEffect, useState} from "react";
import {getFormFieldError} from "util/api_util.js";

const formFieldTheme = {
    backgroundColor: "#242424",
    textColor: "#cbcbcb",
    disabledTextColor: "red",
    placeholderTextColor: "#4c4c4c",
    border: "none",
    height: "40px",
    borderRadius: "4px"
};

const errorTextTheme = {
    textColor: "#ff4949",
    fontSize: "15px"
};

const InputWithError = (props) => {

    const {id, title, type, value, placeholder, onChange, errors, disabled, theme, style, autoComplete = "off"} = props;

    const [error, setError] = useState(undefined);
    const [formValue, setFormValue] = useState(value);

    useEffect(() => setError(getFormFieldError(errors, id)), [id, errors]);

    const renderError = useCallback(() => {
        if (!error) {
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

    const onFormChange = useCallback(v => {
        setFormValue(v);
        onChange?.(v);
    }, [onChange]);

    return <>
        <Input
            name={id}
            style={style ? style : {marginTop: 10, padding: 3}}
            theme={theme ? theme : formFieldTheme}
            id={id}
            value={formValue}
            type={type}
            onChange={onFormChange}
            autoComplete={autoComplete}
            disabled={disabled}
            placeholder={placeholder}/>
        {renderError()}
    </>;
};

export default InputWithError;