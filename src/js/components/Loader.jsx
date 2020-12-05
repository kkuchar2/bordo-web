import React from "react";

import "componentStyles/Loader.scss"

export default props => {
    return <div className={["loader", this.props.visible ? 'fadeIn' : 'fadeOut'].join(" ")}>
        <div className="spinner">
            <div className="double-bounce1"/>
            <div className="double-bounce2"/>
        </div>
    </div>
}