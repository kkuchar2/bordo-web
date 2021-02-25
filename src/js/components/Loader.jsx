import React from "react";

import "componentStyles/Loader.scss";

function Loader(props) {
    return <div className={["loader", props.visible ? 'fadeIn' : 'fadeOut'].join(" ")}>
        <div className="spinner">
            <div className="double-bounce1"/>
            <div className="double-bounce2"/>
        </div>
    </div>;
}
export default Loader;