import React, {Component} from 'react';

import {withRouter} from "react-router-dom";

import "./HomePage.scss"

class HomePage extends Component {

    render() {
        return (
            <div className={"homePage"}>
            </div>
        );
    }
}

export default withRouter(HomePage);