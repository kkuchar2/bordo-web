import React, {Component} from "react";

import "js/components/buttons/Button.scss"

class Button extends Component {
    render() {
        return (
             <button
                 className={["Button", this.props.className].join(" ")}
                 type={this.props.type}
                 onSubmit={this.props.onSubmit}>{this.props.children}</button>
        )
    }
}

export default Button;