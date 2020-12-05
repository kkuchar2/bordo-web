import React from "react";

import "componentStyles/ConnectionError.scss"

export default props => {
    return <div className={"connectionError"}>
        <div className={"errorMessage"}>
            {props.message}
        </div>
    </div>
}