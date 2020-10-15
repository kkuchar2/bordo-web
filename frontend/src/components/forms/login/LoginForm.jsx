import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";
import TextInputField from "components/fields/TextInputField.jsx";
import PasswordInputField from "components/fields/PasswordInputField.jsx";
import SubmitButton from "components/buttons/SubmitButton.jsx";

import FacebookButton from "components/buttons/social/FacebookButton.jsx";
import GoogleButton from "components/buttons/social/GoogleButton.jsx";

import {connect} from "react-redux";

import {Link, withRouter} from "react-router-dom";
import {userActions} from "../../../redux/actions/user.actions";

import "./LoginForm.scss"

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.onUsernameEmailChange = this.onUsernameEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
        this.state = {usernameEmail: '', password: ''};
    }

    onUsernameEmailChange(event) {
        this.setState({usernameEmail: event.target.value});
    }

    onPasswordChange(event) {
        this.setState({password: event.target.value});
    }

    onSubmitForm(event) {
        event.preventDefault();
        this.props.login(this.state.usernameEmail, this.state.password);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let loggedIn = this.props.loggedIn;

        if (loggedIn) {
            this.props.history.push('/home');
        }
    }

    render() {
        return (
            <Grid className={"gridMainLogin"} zeroMinWidth item>
                <Grid className={"loginFormContentGrid"} container>

                    <form onSubmit={this.onSubmitForm}>

                        <Grid spacing={2} style={{padding: 0, margin: 0, width: "100%"}} container>

                            <div className={"loginFields"}>
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
                            </div>

                            <Grid className={"forgotPassword"} style={{padding: 20, margin: 0}} item>
                                <Link to="/" className={"forgotPasswordLink"}>Forgot password?</Link>
                            </Grid>

                            <Grid className={"signIn"} style={{padding: 0, width: "100%", textAlign: "center"}} item>
                                <SubmitButton
                                    className={"signInButton"}
                                    onClick={this.onSubmitForm}
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
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    const {loggingIn, loggedIn, loginError} = state.authentication;
    return {loggingIn, loggedIn, loginError};
};

const mapDispatchToProps = {
    login: userActions.login
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));