import React, {Component} from 'react';
import RegistrationForm from "components/forms/registration/RegistrationForm.jsx";
import {connect} from "react-redux";
import {onCondition} from "../helpers/util.jsx";

import RegistrationCompleteDialog from "../dialogs/RegistrationCompleteDialog.jsx";
import PageWithCenteredContent from "./common/PageWithCenteredContent.jsx";


class RegistrationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {email: ""};
        this.onEmailChange = this.onEmailChange.bind(this);
    }

    onEmailChange(email) {
        this.setState({email: email})
    }

    render() {
        return (
            <PageWithCenteredContent>
                { onCondition(this.props.registrationIdle, <RegistrationForm onEmailChange={this.onEmailChange}/>) }
                { onCondition(this.props.registrationSubmitted, <RegistrationCompleteDialog email={this.state.email}/>) }
            </PageWithCenteredContent>
        );
    }
}

const mapStateToProps = state => {
    const {registrationIdle, registrationSubmitted} = state.registration;
    return {registrationIdle, registrationSubmitted};
};

export default connect(mapStateToProps, {})(RegistrationPage);
