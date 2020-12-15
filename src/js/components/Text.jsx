import React from "react";

import "componentStyles/Text.scss"

export default props => <div className={["text", props.className].join(" ")}>
    {props.text}
    {props.children}
</div>