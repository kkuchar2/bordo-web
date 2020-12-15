import React from "react";
import {getBuildDate} from "util/Util.jsx";

import "componentStyles/Footer.scss"

export default props => {
    return <div
        className={["footer", props.className].join(" ")}>
        <div className={"text"}>Last build: {getBuildDate()}</div>
    </div>
}