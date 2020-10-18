import React, {Component} from "react";

import "./ErrorText.scss"

class ErrorText extends Component {

    render() {
        return (
            <div className={"ErrorText"}>{this.props.text}</div>
        )
    }
}

export default ErrorText;