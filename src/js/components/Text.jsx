import React, {Component} from "react";

import "componentStyles/Text.scss"

class Text extends Component {
    render() {
        return (
            <div className={["Text"].join(" ")}>
                {this.props.text}
            </div>
        )
    }
}

export default Text;