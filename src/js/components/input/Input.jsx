import React, {Component} from "react";

import "./Input.scss"

class Input extends Component {

    render() {
        return (
            <input
                className={["input", this.props.className].join(" ")}
                type="text"
                id={this.props.id}
                name={this.props.name}
                value={this.props.value}
                disabled={this.props.disabled}
                onChange={this.props.onChange}/>
        );
    }
}

export default Input;