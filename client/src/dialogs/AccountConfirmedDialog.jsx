import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import {Link, withRouter} from "react-router-dom";
import SubmitButton from "components/buttons/SubmitButton.jsx";

import "./AccountConfirmedDialog.scss"

class AccountConfirmedDialog extends Component {

    render() {
        return (
            <Grid className={"gridMainAccountConfirmation"} zeroMinWidth item>
                <Grid className={"accountConfirmedDialogContentGrid"} container>
                    <Grid className={"line accountConfirmedSection"} item>
                        <p className={"accountConfirmed"}>Account has successfully been confirmed!</p>
                    </Grid>

                    <Grid className={"line returnToHomepageSection"} item>
                        <Link to='/'>
                            <SubmitButton className={"returnToHomepageButton"} text={"Return to homepage"}/>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default withRouter(AccountConfirmedDialog)