import React from 'react';

import "styles/pages/NotFound.scss";

function NotFound() {
    return <div className={"notFound"}>
        <div className={"notFoundCode"}>404</div>
        <div className={"notFoundText"}>Page not found</div>
    </div>;
}

export default NotFound;