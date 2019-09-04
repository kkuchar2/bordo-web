import React, {Component} from "react";

import Text from "components/text/Text.jsx";

import "./SubmitButton.scss"

class SubmitButton extends Component {
    render() {
        return (
            <button
                className={[
                    "SubmitButton",
                    this.props.className,
                    this.props.processing ? 'hidden':'visible'].join(" ")}
                type={"submit"}
                onClick={this.props.onClick}>
                <div className={"content"}>
                    <Text visible={!this.props.processing} text={this.props.text} />
                </div>
            </button>
        )
    }
}

export default SubmitButton;