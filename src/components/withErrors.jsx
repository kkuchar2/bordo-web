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

const withErrors = (WrappedInput) => {

    function wrapped(props) {

        const {errors, id, theme, style, ...rest} = props;

        const [error, setError] = useState(undefined);

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

        return <>
            <WrappedInput
                id={id}
                theme={theme ? theme : formFieldTheme}
                style={style ? style : {marginTop: 10, padding: 3}}
                {...rest} />
            {renderError()}
        </>;
    }

    return wrapped;
};

export default withErrors;