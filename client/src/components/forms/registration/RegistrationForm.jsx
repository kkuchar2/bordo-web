import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'

import Grid from "@material-ui/core/Grid";

import TextInputField from "components/fields/TextInputField.jsx";
import PasswordInputField from "components/fields/PasswordInputField.jsx";
import SubmitButton from "components/buttons/SubmitButton.jsx";
import PrivacyPolicy from "components/privacy_policy/PrivacyPolicy.jsx";
import Loader from "components/loaders/Loader.jsx";

import "./RegistrationForm.scss"

class RegistrationForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password1: '',
            password2: '',
            processing: false
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPassword1Change = this.onPassword1Change.bind(this);
        this.onPassword2Change = this.onPassword2Change.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onEmailChange(event) {
        this.setState({emailError: "", email: event.target.value});
    }

    onUsernameChange(event) {
        this.setState({usernameError: "", username: event.target.value})
    }

    onPassword1Change(event) {
        this.setState({password1Error: "", password1: event.target.value});
    }

    onPassword2Change(event) {
        this.setState({password2Error: "", password2: event.target.value});
    }

    onSubmitForm(event) {
        event.preventDefault();
        // TODO: register
    }

    render() {
        return (
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
                                    errorText={this.state.emailError}>
                                </TextInputField>

                            </Grid>

                            <Grid className={"field"} style={{padding: 0}} item>

                                <TextInputField
                                    className={"usernameField"}
                                    name={"username"}
                                    placeholder={"Username"}
                                    onChange={this.onUsernameChange}
                                    errorText={this.state.usernameError}>
                                </TextInputField>

                            </Grid>

                            <Grid className={"field"} style={{padding: 0}} item>

                                <PasswordInputField
                                    className={"passwordField1"}
                                    id={"password1"}
                                    name={"password1"}
                                    placeholder={"Password"}
                                    errorText={this.state.password1Error}
                                    onChange={this.onPassword1Change}>
                                </PasswordInputField>

                            </Grid>

                            <Grid className={"field"} style={{padding: 0}} item>

                                <PasswordInputField
                                    className={"passwordField2"}
                                    id={"password2"}
                                    name={"password2"}
                                    placeholder={"Password (confirm)"}
                                    errorText={this.state.password2Error}
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
        );
    }
}

export default withRouter(RegistrationForm);