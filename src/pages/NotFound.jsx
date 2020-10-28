import React, {Component} from 'react';

import "./NotFound.scss"

class NotFound extends Component {

    render() {
        return (
            <div className={"notFound"}>
                <div className={"notFoundText"}>Page not found.</div>
            </div>
        );
    }
}

export default NotFound;