import React, {Component} from 'react';

import "./OverlayGradient.scss"

class OverlayGradient extends Component {

    render() {
        return (
            <div style={{
                background: `linear-gradient(${this.props.startColor}, ${this.props.endColor})`,
                zIndex: `${this.props.zindex}`,
            }}
                 className={"overlayGradient"}
            />
        );
    }
}

export default OverlayGradient;