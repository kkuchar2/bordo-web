import React, {Component} from "react";

import "js/components/text/Text.scss"

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