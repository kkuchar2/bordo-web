import React, {useCallback} from "react";

import Text from "components/Text";

import "componentStyles/Input.scss";

function Input(props) {

    const renderTitle = useCallback(() => {
        if (props.title) {
            return <div className={"title"}>{props.title}</div>;
        }
    }, [props.title]);

    return <div className={"inputWrapper"}>
        <Text className={"formName"}>{renderTitle()}</Text>
        <div className={["input", props.className].join(" ")}>
            <input
                spellCheck="false"
                className={"inputField"}
                type={props.type}
                id={props.id}
                value={props.value}
                name={props.name}
                autoComplete={props.autoComplete}
                placeholder={props.placeholder}
                disabled={props.disabled}
                onChange={props.onChange} required/>
        </div>
    </div>;
}

export default Input;