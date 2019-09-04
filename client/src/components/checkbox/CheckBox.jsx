import React, {Component} from "react";

import "./CheckBox.scss"

class CheckBox extends Component {
    render() {
        return (
            <div className={"checkbox"}>
                <input type="checkbox" className="checkboxInput" />
                <div className={"checkboxText"}>{this.props.text}</div>
            </div>
        )
    }
}

export default CheckBox;