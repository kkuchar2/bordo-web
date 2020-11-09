import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";

import "js/components/privacy_policy/PrivacyPolicy.scss"
import {Link} from "react-router-dom";

class PrivacyPolicy extends Component {

    render() {
        return (
            <Grid className={"policy"} style={{padding: 0, margin: 20}} item>
                By proceeding you agree to  <Link to='/'>Terms of Service</Link> and<Link to='/'>Privacy
                Policy</Link>
            </Grid>
        );
    }
}

export default PrivacyPolicy;
