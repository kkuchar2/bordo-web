import React, {Component} from "react";

import "Button.scss"

class Button extends Component {
    render() {
        return (
             <button
                 className={["Button.js", this.props.className].join(" ")}
                 type={this.props.type}
                 onSubmit={this.props.onSubmit}>{this.props.text}</button>
        )
    }
}

export default Button;