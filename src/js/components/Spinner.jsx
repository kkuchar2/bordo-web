import React from "react";

import "componentStyles/Spinner.scss";

function Spinner(props) {

    const renderText = () => {
        if (props.text !== undefined) {
            return <div className={"text"}>{props.text}</div>;
        }
    };

    return <div className={"spinner"}>
        {renderText()}
        <svg className={["loader", props.className].join(' ')} viewBox="0 0 24 24">
            <circle className="loader__value" cx="12" cy="12" r="10"/>
            <circle className="loader__value" cx="12" cy="12" r="10"/>
            <circle className="loader__value" cx="12" cy="12" r="10"/>
            <circle className="loader__value" cx="12" cy="12" r="10"/>
            <circle className="loader__value" cx="12" cy="12" r="10"/>
            <circle className="loader__value" cx="12" cy="12" r="10"/>
        </svg>
    </div>;
}

export default Spinner;