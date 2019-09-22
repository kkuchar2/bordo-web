import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {Link, withRouter} from "react-router-dom";
import SubmitButton from "components/buttons/SubmitButton.jsx";
import Image from "components/image/image.jsx";

import {connect} from "react-redux";
import {userActions} from "../redux/actions";

import "./RegistrationCompleteDialog.scss"

class RegistrationCompleteDialog extends Component {

    constructor(props) {
        super(props);
        this.onBackClick = this.onBackClick.bind(this);
    }

    onBackClick() {
        this.props.closeRegistration();
    }

    render() {
        return (
            <Grid className={"gridMainRegistrationComplete"} zeroMinWidth item>
                <Grid className={"registrationCompleteDialogContentGrid"} container>

                    <Grid className={"line iconSection"} item>
                        <Image className={"buttonIcon"} src={require('images/mail.png')} scale={0.1}/>
                    </Grid>

                    <Grid className={"line emailSentSection"} item>
                        <p className={"emailSent"}>We sent a confirmation email to: </p>
                    </Grid>

                    <Grid className={"line emailSection"} item>
                        <p className={"emailValue"}>{this.props.email}</p>
                    </Grid>

                    <Grid className={"line instructionSection"} item>
                        Check your email and click on the confirmation link to continue
                    </Grid>

                    <Grid className={"line returnToHomepageSection"} item>
                        <Link to='/'>
                            <SubmitButton onClick={this.onBackClick} className={"returnToHomepageButton"}
                                          text={"Return to homepage"}/>
                        </Link>

                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    const {registrationComplete} = state.registration;
    return {registrationComplete};
};

const mapDispatchToProps = {
    closeRegistration: userActions.closeRegistration
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationCompleteDialog));