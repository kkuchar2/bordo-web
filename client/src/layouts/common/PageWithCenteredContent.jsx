import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";

import "./PageWithCenteredContent.scss"

class PageWithCenteredContent extends Component {

    render() {
        return (
            <div className={"pageWithCenteredContent"}>
                <Grid style={{height: "100%"}} justify="center" alignItems="center" container>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

export default PageWithCenteredContent;
