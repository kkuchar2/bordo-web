import React from "react";

import "componentStyles/ConnectionError.scss";

function ConnectionError(props) {
    return <div className={"connectionError"}>
        <div className={"errorMessage"}>
            {props.message}
        </div>
    </div>;
}

export default ConnectionError;