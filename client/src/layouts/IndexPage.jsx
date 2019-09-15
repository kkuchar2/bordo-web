import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";
import LoginForm from "../components/forms/login/LoginForm.jsx";

import "./IndexPage.scss"
import {withRouter} from "react-router-dom";

class IndexPage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={"indexPage"}>
                <Grid className={"containerMain"} justify="center" alignItems="center" container>
                    <Grid className={"gridMainLogin"} zeroMinWidth item>
                        <LoginForm />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withRouter(IndexPage);
