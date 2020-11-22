import React, {Component} from "react";
import {getBuildDate} from "util/Util.jsx";

import "componentStyles/Footer.scss"

class Footer extends Component {
    render() {
        return (
            <div
                className={["footer", this.props.className].join(" ")}>
                <div className={"text"}>Last build: {getBuildDate()}</div>
            </div>
        )
    }
}

export default Footer;