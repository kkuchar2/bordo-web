import React, {useState, useCallback} from "react";

import Input from "components/Input";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import Text from "components/Text";
import {getResponseError} from "util/api_util.js";
import {useEffectWithNonNull} from "util/util.js";

function InputWithError(props) {

    const [error, setError] = useState(undefined);

    useEffectWithNonNull(() => setError(getResponseError(props.errors, props.id)), [props.id, props.errors]);

    const renderError = useCallback(() => {
        if (error === undefined) {
            return;
        }
        if (error.length === 0) {
            return;
        }

        let rows = [];
        for (let i = 0; i < error.length; i++) {
            rows.push(<div key={i} className={"errorWrapper"}>
                <FontAwesomeIcon className={"errorIcon"} icon={faExclamationCircle}/>
                <Text className={"errorText"} text={error[i]['message']}/>
            </div>);
        }
        return <>{rows}</>;
    }, [error]);

    const onChange = useCallback(props.onChange, []);

    const getClassName = useCallback(() => error !== undefined ? 'error' : 'noError', [error]);

    return <>
        <Input
            className={getClassName()}
            title={props.name}
            id={props.id}
            type={props.type}
            onChange={onChange}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}/>
        {renderError()}
    </>;
}

export default InputWithError;