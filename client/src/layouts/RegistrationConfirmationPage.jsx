import React, {Component} from 'react';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {userActions} from "../redux/actions";
const queryString = require('query-string');

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

        console.log(this.props.emailConfirmed);

        return (
            <div>
                <div>Account confirmed, token: {this.state.token}, uid: {this.state.uid}</div>
            </div>
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