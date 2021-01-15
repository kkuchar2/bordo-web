import React from "react";

import "componentStyles/Input.scss"

export default props => {

    const renderTitle = () => {
        if (props.title) {
            return <div className={"title"}>{props.title}</div>
        }
    }

    return <div className={["input", props.className].join(" ")}>
        {renderTitle()}
        <input
            className={"inputField"}
            type={props.type}
            id={props.id}
            name={props.name}
            autoComplete={props.autoComplete}
            placeholder={props.placeholder}
            disabled={props.disabled}
            onChange={props.onChange} />
    </div>
}