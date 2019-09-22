import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";

import RegistrationForm from "components/forms/registration/RegistrationForm.jsx";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import RegistrationCompleteDialog from "../dialogs/RegistrationCompleteDialog";

import "./RegistrationPage.scss"

class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {email: ""};
        this.onEmailChange = this.onEmailChange.bind(this);
    }

    onEmailChange(email) {
        this.setState({email: email})
    }

    renderRegistrationForm() {
        if (this.props.registrationIdle) {
            return (
                <Grid className={"gridMainRegistration"} zeroMinWidth item>
                    <RegistrationForm onEmailChange={this.onEmailChange}/>
                </Grid>
            );
        }
    }

    renderRegistrationCompleteDialog() {
        if (this.props.registrationSubmitted) {
            return (
                <Grid className={"gridMainRegistrationComplete"} zeroMinWidth item>
                    <RegistrationCompleteDialog email={this.state.email}/>
                </Grid>
            );
        }
    }

    render() {
        return (
            <div className={"registrationPage"}>
                <div className={"background"}/>
                <Grid className={"containerMain"} justify="center" alignItems="center" container>
                    {this.renderRegistrationForm()}
                    {this.renderRegistrationCompleteDialog()}
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {registrationIdle, registrationSubmitted} = state.registration;
    return {registrationIdle, registrationSubmitted};
};

export default withRouter(connect(mapStateToProps, {})(RegistrationPage));
