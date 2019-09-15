import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";

import ModalDialog from "components/dialog/ModalDialog.jsx";

import RegistrationForm from "components/forms/registration/RegistrationForm.jsx";

import "./RegistrationPage.scss"
import {userActions} from "../redux/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

class RegistrationPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
            uid: '',
            token: '',
            lastCookie: '',
        };

        this.closeDialog = this.closeDialog.bind(this);
        this.showDialog = this.showDialog.bind(this);
    }

    showDialog() {
        this.setState({showDialog: true})
    }

    closeDialog() {
        this.setState({showDialog: false})
    }

    renderDialog() {
        if (this.state.showDialog) {
            return <ModalDialog onClose={this.closeDialog}/>;
        }
    }

    renderContent() {
        if (this.props.registrationComplete) {

        }
    }

    render() {
        return (
            <div className={"registrationPage"}>
                <div className={"background"}/>
                <Grid className={"containerMain"} justify="center" alignItems="center" container>
                    <Grid className={"gridMainRegistration"} zeroMinWidth item>
                        <RegistrationForm />
                    </Grid>
                </Grid>
                {this.renderDialog()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {registrationComplete} = state.authentication;
    return {registrationComplete};
};

const mapDispatchToProps = {

};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationPage));
