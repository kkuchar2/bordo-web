import React from "react";

import "componentStyles/Spinner.scss"

export default props => {
    return <svg className={["loader", props.className].join(' ')} viewBox="0 0 24 24">
        <circle className="loader__value" cx="12" cy="12" r="10"/>
        <circle className="loader__value" cx="12" cy="12" r="10"/>
        <circle className="loader__value" cx="12" cy="12" r="10"/>
        <circle className="loader__value" cx="12" cy="12" r="10"/>
        <circle className="loader__value" cx="12" cy="12" r="10"/>
        <circle className="loader__value" cx="12" cy="12" r="10"/>
    </svg>
}