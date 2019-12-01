import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";

import "./PageWithCenteredContent.scss"

class PageWithCenteredContent extends Component {

    constructor(props) {
        super(props);
        this.getStyle = this.getStyle.bind(this);
    }

    getStyle() {
        if (this.props.horizontalOnly) {
            return {};
        }
        else {
            return {height: "100%"};
        }
    }

    render() {
        return (
            <div className={"pageWithCenteredContent"}>
                <Grid style={this.getStyle()} justify="center" alignItems="center" container>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}

export default PageWithCenteredContent;
