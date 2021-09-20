import React, {useCallback, useEffect, useState} from "react";

import {FieldError} from "components/FormComponents/FormErrors/FieldError";
import {Input} from "kuchkr-react-component-library";
import {InputProps} from "kuchkr-react-component-library/build/components/Input/Input.types";
import {BaseComponentProps} from "kuchkr-react-component-library/build/hoc/baseComponent";
import {useTranslation} from "react-i18next";

import {getFormFieldError} from "../api/api_util";

const formFieldTheme = {
    backgroundColor: "rgba(255,255,255,0)",
    textColor: "#474747",
    border: "2px solid " + "rgba(175,175,175,0.37)",
    borderFocus: "2px solid " + "#5B92FC",
    borderRadius: "0",
    height: "40px",
    width: "100%",
    padding: "0px",
    caretColor: "#646464",

    titleTextTheme: {
        textColor: '#2f2f2f',
        fontSize: '0.9em',
        fontWeight: '500',
        textAlign: 'left',
        margin: "0px 0px 10px 0px"
    },

    inputTextTheme: {
        textColor: '#2f2f2f',
        fontSize: '0.9em',
        fontWeight: 'bold',
        textAlign: 'left',
        margin: "0px 0px 0px 0px"
    },

    placeholderTextTheme: {
        textColor: '#ababab',
        fontSize: '1.1em',
        textAlign: 'left'
    }
};

export interface WrappedInputProps {
    errors?: any, // TODO
}

const withErrors = (WrappedInput: typeof Input) => {

    function wrapped(props: (WrappedInputProps & InputProps & BaseComponentProps)) {

        const {t} = useTranslation();

        const {id, theme, errors, ...rest} = props;

        const [error, setError] = useState([]);

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
                console.log(error[i]['message']);
                rows.push(<FieldError key={i} error={t(error[i]['message'])}/>);
            }
            return <>{rows}</>;
        }, [error]);

        return <>
            <WrappedInput
                style={{marginTop: 35}}
                id={id}
                theme={theme ? theme : formFieldTheme}
                {...rest} />
            {renderError()}
        </>;
    }

    return wrapped;
};

export default withErrors;