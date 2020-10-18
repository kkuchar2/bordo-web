import React, {Component} from 'react';

import "./PageWithCenteredContent.scss"

class PageWithCenteredContent extends Component {

    constructor(props) {
        super(props);
        this.getStyle = this.getStyle.bind(this);
    }

    getStyle() {
        if (this.props.horizontalOnly) {
            return {};
        } else {
            return {height: "100%"};
        }
    }

    render() {
        return (
            <div className={"pageWithCenteredContent"}>
                {this.props.children}
            </div>
        );
    }
}

export default PageWithCenteredContent;
