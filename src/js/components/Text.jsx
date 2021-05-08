import React from "react";
import classNames from "classnames";

import "componentStyles/Text.scss";

function Text(props){

    const {text, children, className, disabled} = props;

    return <div className={classNames("text", className, {disabled: disabled})}>
        {text}
        {children}
    </div>;
}

export default Text;