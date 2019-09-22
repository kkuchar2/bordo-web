import React, {Component} from "react";

import Text from "components/text/Text.jsx";

import "./SubmitButton.scss"

class SubmitButton extends Component {

    constructor(props) {
        super(props);
        this.state = {text: "Submit"}
    }

    componentDidMount() {
        if (this.props.text !== undefined) {
            this.setState({text: this.props.text});
        }
    }

    render() {
        return (
            <button
                className={["SubmitButton", this.props.className].join(" ")}
                type={"submit"}
                onClick={this.props.onClick}>
                <div className={"content"}>
                    <Text
                        visible={!this.props.processing}
                        text={this.state.text}
                        onClick={this.state.onTextClick}
                    >
                    </Text>
                </div>
            </button>
        )
    }
}

export default SubmitButton;