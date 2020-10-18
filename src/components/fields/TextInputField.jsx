import React, {Component} from "react";

import ErrorText from "components/errors/ErrorText.jsx";

import "./TextInputField.scss"

class TextInputField extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <input
                    type={"text"}
                    name={this.props.name}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}>
                </input>

               <ErrorText text={ this.props.errorText} />

            </div>
        )
    }
}

export default TextInputField;