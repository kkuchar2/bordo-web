import React, {Component} from 'react';

import "./HomePage.scss"
import {withRouter} from "react-router-dom";

class HomePage extends Component {

    render() {
        return (
            <div className={"homePage"}>
            </div>
        );
    }
}

export default withRouter(HomePage);