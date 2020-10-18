import React, {Component} from "react";
import ErrorText from "components/errors/ErrorText.jsx";

import "./PasswordInputField.scss"

class PasswordInputField extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <input
                    type={"password"}
                    id={this.props.id}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}>
                </input>

                <ErrorText text={this.props.errorText} />
            </div>
        )
    }
}

export default PasswordInputField;