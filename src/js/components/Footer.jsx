import React from "react";
import {getBuildDate} from "util/util.js";

import "componentStyles/Footer.scss"

export default props => {
    return <div
        className={["footer", props.className].join(" ")}>
    </div>
}