import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {userActions} from "../redux/actions";
import AccountConfirmedDialog from "../dialogs/AccountConfirmedDialog.jsx";
const queryString = require('query-string');

import PageWithCenteredContent from "./common/PageWithCenteredContent.jsx";

class RegistrationConfirmationPage extends Component {

    constructor(props) {
        super(props);
        this.state = {token: "", uid: ""}
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        this.setState({token: parsed["token"], uid: parsed["uid"]});
        this.props.confirmAccount(parsed["uid"], parsed["token"]);
    }

    render() {
        return (
            <PageWithCenteredContent>
                <AccountConfirmedDialog/>
            </PageWithCenteredContent>
        );
    }
}

const mapStateToProps = state => {
    const {emailConfirmed} = state.registration;
    return {emailConfirmed};
};

const mapDispatchToProps = {
    confirmAccount: userActions.confirmAccount
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegistrationConfirmationPage));