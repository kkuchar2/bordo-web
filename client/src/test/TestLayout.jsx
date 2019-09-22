import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import AccountConfirmedDialog from "../dialogs/AccountConfirmedDialog.jsx";

import "./TestLayout.scss"

class TestPage extends Component {

    render() {
        return (
            <div className={"testPage"}>
                <div className={"background"}/>
                <Grid className={"containerMain"} justify="center" alignItems="center" container>
                    <Grid className={"gridMainTest"} zeroMinWidth item>
                        <AccountConfirmedDialog />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default TestPage;