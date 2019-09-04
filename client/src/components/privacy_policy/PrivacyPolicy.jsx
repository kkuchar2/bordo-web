import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";

import "./PrivacyPolicy.scss"

class PrivacyPolicy extends Component {

    render() {
        return (
            <Grid className={"policy"} style={{padding: 0, margin: 20}} item>
                By proceeding you agree to<a href={"/"}>Terms of Service</a> and<a href={"/"}>Privacy
                Policy</a>
            </Grid>
        );
    }
}

export default PrivacyPolicy;
