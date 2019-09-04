import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";
import LoginForm from "../components/forms/login/LoginForm.jsx";

import "./HomePage.scss"

class HomePage extends Component {

    render() {
        return (
            <div className={"loginPage"}>
                <div className={"background"}/>
                <Grid className={"containerMain"} justify="center" alignItems="center" container>
                    <Grid className={"gridMainLogin"} zeroMinWidth item>
                        <LoginForm />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default HomePage;
