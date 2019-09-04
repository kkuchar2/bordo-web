import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";
import TextInputField from "components/fields/TextInputField.jsx";
import PasswordInputField from "components/fields/PasswordInputField.jsx";
import SubmitButton from "components/buttons/SubmitButton.jsx";
import ErrorText from "components/errors/ErrorText.jsx";
import APIRequest from "components/common/APIRequest.jsx";

import FacebookButton from "components/buttons/social/FacebookButton.jsx";
import GoogleButton from "components/buttons/social/GoogleButton.jsx";


import Loader from "components/loaders/Loader.jsx";
import CheckBox from "components/checkbox/CheckBox.jsx";

import Cookies from 'universal-cookie';

import "./LoginForm.scss"
import {Link} from "react-router-dom";

const cookies = new Cookies();

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            usernameEmail: '',
            password: '',
            usernameEmailError: '',
            passwordError: '',
            formError: '',
            processing: false,
        };

        this.onUsernameEmailChange = this.onUsernameEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.login = this.login.bind(this);
        this.onLoginResponse = this.onLoginResponse.bind(this);
        this.onLoginError = this.onLoginError.bind(this);

        this.apiRequest = new APIRequest("login/", this.onLoginResponse, this.onLoginError);
    }

    renderFormError() {
        const error = this.state.formError;

        if (error !== undefined && error !== "") {
            return <ErrorText text={error}/>;
        }
    }

    onUsernameEmailChange(event) {
        this.setState({usernameEmailError: "", passwordError: "", formError: "", usernameEmail: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({usernameEmailError: "", passwordError: "", formError: "", password: event.target.value});
    }

    onSubmitForm(event) {
        event.preventDefault();
        this.login();
    }

    login() {
        this.setState({processing: true});
        this.apiRequest.call({"username": this.state.usernameEmail, "password": this.state.password});
    }

    onLoginResponse(data) {
        console.log(JSON.stringify(data, null, 4));
        cookies.set('key', data["key"], {path: '/', secure: true, sameSite: true});
    }

    onLoginError(error) {
        console.log(error);
    }

    render() {
        return (
            <Grid className={"loginFormContentGrid"} container>

                <form onSubmit={this.onSubmitForm}>

                    <Grid spacing={2} style={{padding: 0, margin: 0, width: "100%"}} container>

                        <div className={"title"}>Welcome</div>

                        <Grid className={"field"} style={{padding: 0}} item>

                            <TextInputField
                                className={"emailUsernameField"}
                                name={"username"}
                                placeholder={"E-mail or username"}
                                onChange={this.onUsernameEmailChange}
                                errorText={this.state.usernameEmailError}>
                            </TextInputField>

                        </Grid>

                        <Grid className={"field"} style={{padding: 0}} item>

                            <PasswordInputField
                                className={"passwordField"}
                                name={"password"}
                                placeholder={"Password"}
                                onChange={this.onPasswordChange}
                                errorText={this.state.passwordError}>
                            </PasswordInputField>

                        </Grid>

                        <Grid className={"rememberForgot"} style={{padding: 20, margin: 0}} item>
                            <CheckBox text={"Remember me"} />
                            <div className={"forget"}>
                                <Link to="/" className={"forgotPasswordLink"}>Forgot password?</Link>
                            </div>
                        </Grid>

                        <Grid className={"signIn"} style={{padding: 0, width: "100%", textAlign: "center"}} item>
                            <Loader visible={this.state.processing}/>
                            <SubmitButton
                                className={"signInButton"}
                                onClick={this.onSubmitForm}
                                processing={this.state.processing}
                                text={"Log in"}>s
                            </SubmitButton>
                        </Grid>


                        <div className={"createAccount"}>
                            <Link to='/register' className={"createAccountLink"}>Register</Link>
                        </div>


                        <div className={"bottomSection"}>

                            <GoogleButton/>
                            <FacebookButton/>


                        </div>

                    </Grid>
                </form>
            </Grid>
        );
    }
}

export default LoginForm;