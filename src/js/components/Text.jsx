import React from "react";

import "componentStyles/Text.scss";

function Text(props){
    return <div className={["text", props.className].join(" ")}>
        {props.text}
        {props.children}
    </div>;
}

export default Text;