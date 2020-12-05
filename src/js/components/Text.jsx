import React from "react";

import "componentStyles/Text.scss"

export default props => {
    return <div className={["Text"].join(" ")}>
        {props.text}
    </div>
}