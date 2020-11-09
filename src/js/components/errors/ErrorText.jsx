import React, {Component} from "react";

import "js/components/errors/ErrorText.scss"

class ErrorText extends Component {

    render() {
        return (
            <div className={"ErrorText"}>{this.props.text}</div>
        )
    }
}

export default ErrorText;