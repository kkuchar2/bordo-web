import React, {Component} from "react";

import "js/components/popup/Popup.scss"

class Popup extends Component {
    render() {
        return (
            <div className={"Popup"}>
                <div className={"PopupBlock"}>
                    <div className={"text"}>Signing up...</div>
                    <div className="multi-ripple">
                        <div/>
                        <div/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;