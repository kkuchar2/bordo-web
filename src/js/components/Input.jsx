import React from "react";

import "componentStyles/Input.scss"

export default props => {
    return <input
        className={["input", props.className].join(" ")}
        type="text"
        id={props.id}
        name={props.name}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}/>
}