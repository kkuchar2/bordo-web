import React, {Component} from "react";

import "js/components/spinner/Spinner.scss"

class Spinner extends Component {
    render() {
        return (
            <svg className="loader" viewBox="0 0 24 24">
                <circle className="loader__value" cx="12" cy="12" r="10"/>
                <circle className="loader__value" cx="12" cy="12" r="10"/>
                <circle className="loader__value" cx="12" cy="12" r="10"/>
                <circle className="loader__value" cx="12" cy="12" r="10"/>
                <circle className="loader__value" cx="12" cy="12" r="10"/>
                <circle className="loader__value" cx="12" cy="12" r="10"/>
            </svg>
        );
    }
}

export default Spinner;