import React, {Component} from "react";

import "js/components/loaders/Loader.scss"

class Loader extends Component {

    render() {
        return (
            <div className={["loader", this.props.visible ? 'fadeIn':'fadeOut'].join(" ")} >
                <div className="spinner">
                    <div className="double-bounce1"/>
                    <div className="double-bounce2"/>
                </div>
            </div>
        )
    }
}

export default Loader;