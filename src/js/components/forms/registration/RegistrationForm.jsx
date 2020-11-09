import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'

import Grid from "@material-ui/core/Grid";

import TextInputField from "js/components/fields/TextInputField.jsx";
import PasswordInputField from "js/components/fields/PasswordInputField.jsx";
import SubmitButton from "js/components/buttons/SubmitButton.jsx";
import PrivacyPolicy from "js/components/privacy_policy/PrivacyPolicy.jsx";
import Loader from "js/components/loaders/Loader.jsx";


import {connect} from "react-redux";
import {userActions} from "../../../redux/actions";

import "js/components/forms/registration/RegistrationForm.scss"

class RegistrationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            username: '',
            password1: '',
            password2: ''
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPassword1Change = this.onPassword1Change.bind(this);
        this.onPassword2Change = this.onPassword2Change.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onEmailChange(event) {
        this.setState({email: event.target.value});
        this.props.onEmailChange(event.target.value);
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value})
    }

    onPassword1Change(event) {
        this.setState({password1: event.target.value});
    }

    onPassword2Change(event) {
        this.setState({password2: event.target.value});
    }

    onSubmitForm(event) {
        event.preventDefault();
        this.props.register(
            this.state.email,
            this.state.username,
            this.state.password1,
            this.state.password2
        );
    }

    render() {
        return (
            <Grid className={"gridMainRegistration"} zeroMinWidth item>
                <Grid style={{padding: 0}} className={"registrationFormContentGrid"} container>

                    <form style={{width: "100%", padding: 0}} onSubmit={this.onSubmitForm}>
                        <Grid style={{width: "100%", padding: 0, margin: 0}} spacing={2} container>

                            <div className={"registrationFields"}>

                                <Grid className={"field"} style={{padding: 0}} item>

                                    <TextInputField
                                        className={"emailField"}
                                        name={"email"}
                                        placeholder={"E-mail"}
                                        onChange={this.onEmailChange}
                                        errorText={""}>
                                    </TextInputField>

                                </Grid>

                                <Grid className={"field"} style={{padding: 0}} item>

                                    <TextInputField
                                        className={"usernameField"}
                                        name={"username"}
                                        placeholder={"Username"}
                                        onChange={this.onUsernameChange}
                                        errorText={""}>
                                    </TextInputField>

                                </Grid>

                                <Grid className={"field"} style={{padding: 0}} item>

                                    <PasswordInputField
                                        className={"passwordField1"}
                                        id={"password1"}
                                        name={"password1"}
                                        placeholder={"Password"}
                                        errorText={""}
                                        onChange={this.onPassword1Change}>
                                    </PasswordInputField>

                                </Grid>

                                <Grid className={"field"} style={{padding: 0}} item>

                                    <PasswordInputField
                                        className={"passwordField2"}
                                        id={"password2"}
                                        name={"password2"}
                                        placeholder={"Password (confirm)"}
                                        errorText={""}
                                        onChange={this.onPassword2Change}>
                                    </PasswordInputField>

                                </Grid>
                            </div>

                            <Grid className={"register"} style={{padding: 0, width: "100%", textAlign: "center"}} item>
                                <Loader visible={this.state.processing}/>
                                <SubmitButton
                                    className={"registerButton"}
                                    onClick={this.onSubmitForm}
                                    processing={this.state.processing}
                                    text={"Register"}>s
                                </SubmitButton>
                            </Grid>

                            <PrivacyPolicy/>

                            <Grid className={"alreadymemeber"} style={{padding: 0}} item>
                                <div className={"question"}>Already a member?</div>
                                <div className={"signInReturn"}>
                                    <Link to='/'>Sign in</Link>
                                </div>
                            </Grid>

                        </Grid>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    const {registering, registrationSubmitted} = state.registration;
    return {registering, registrationSubmitted};
};

const mapDispatchToProps = {
    register: userActions.register
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationForm));