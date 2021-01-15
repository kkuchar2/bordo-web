import React, {useState} from "react";


import Input from "components/Input.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import Text from "components/Text.jsx";
import {getResponseError} from "util/api_util.js";
import {useEffectWithNonNull} from "util/util.js";

export default props => {

    const [error, setError] = useState(undefined);

    useEffectWithNonNull(() => setError(getResponseError(props.data, props.id)), [props.id, props.data])

    const renderError = () => {
        if (error === undefined) return;
        if (error.length === 0) return;

        let rows = [];
        for (let i = 0; i < error.length; i++) {
            rows.push(<div key={i} className={"errorWrapper"}>
                <FontAwesomeIcon className={"errorIcon"} icon={faExclamationCircle}/>
                <Text className={"errorText"} text={error[i]['message']}/>
            </div>);
        }
        return <>{rows}</>;
    }

    const onChange = v => {
        props.onChange(v);
    }

    const getClassName = () => error !== undefined ? 'error' : 'noError';

    return <>
        <Input
            className={getClassName()}
            id={props.id}
            type={props.type}
            onChange={onChange}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}/>
        {renderError()}
    </>
}